import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";
import * as XLSX from "xlsx";
import dbConnect from "@/lib/dbConnect";
import CustomerVendor from "@/lib/models/Leager";
import User from "@/lib/models/User";
import mongoose from "mongoose";
import OutwardPayment from "@/lib/models/OutwardPayment";

export async function POST(request) {
  const session = await mongoose.startSession(); // Start a session for transactions
  try {
    // Handle file upload
    const formData = await request.formData();
    const file = formData.get("file");
    const createdByEmail = formData.get("createdByEmail");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!createdByEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, continue
    }

    // Process file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse Excel data
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      return NextResponse.json(
        { error: "Excel file is empty or invalid" },
        { status: 400 }
      );
    }

    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (sheetData.length === 0) {
      return NextResponse.json(
        { error: "No data found in Excel file" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Start transaction
    session.startTransaction();

    // Validate required fields
    const requiredFields = [
      "customerVendorEmail",
      "receiptNo",
      "paymentDate",
      "payment",
      "paymentType",
    ];
    for (const row of sheetData) {
      const missingFields = requiredFields.filter((field) => !row[field]);
      if (missingFields.length > 0) {
        await session.abortTransaction();
        return NextResponse.json(
          {
            error: `Missing required fields: ${missingFields.join(", ")}`,
            row: row,
          },
          { status: 400 }
        );
      }
    }

    // Get all unique customer vendor emails
    const uniqueEmails = [
      ...new Set(sheetData.map((row) => row.customerVendorEmail)),
    ];

    // Resolve customerVendorId and createdBy
    const customerVendors = await CustomerVendor.find({
      email: { $in: uniqueEmails },
    })
      .session(session)
      .lean();

    const customerVendorMap = customerVendors.reduce((map, vendor) => {
      map[vendor.email] = vendor._id;
      return map;
    }, {});

    // Check if all customer vendors exist
    const missingVendors = uniqueEmails.filter(
      (email) => !customerVendorMap[email]
    );
    if (missingVendors.length > 0) {
      await session.abortTransaction();
      return NextResponse.json(
        {
          error: `Customer/Vendor not found for emails: ${missingVendors.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    const createdByUser = await User.findOne({ email: createdByEmail })
      .session(session)
      .lean();
    if (!createdByUser) {
      await session.abortTransaction();
      return NextResponse.json(
        { error: "Created by user not found." },
        { status: 400 }
      );
    }

    let spentCash = 0;

    // Prepare data for insertion
    const payments = sheetData.map((row) => {
      const customerVendorId = customerVendorMap[row.customerVendorEmail];
      const payment = Number(row.payment);

      if (isNaN(payment)) {
        throw new Error(`Invalid payment amount for receipt ${row.receiptNo}`);
      }

      spentCash += payment;

      return {
        receiptNo: row.receiptNo,
        customerVendorId,
        paymentDate: new Date(row.paymentDate),
        payment: payment,
        paymentType: row.paymentType,
        createdBy: createdByUser._id,
      };
    });

    // Update user's cash balance
    await User.findOneAndUpdate(
      { email: createdByEmail },
      { $inc: { cash: -spentCash } },
      { new: true, session }
    );

    // Insert payments into MongoDB
    await OutwardPayment.insertMany(payments, { session });

    // Commit the transaction
    await session.commitTransaction();

    return NextResponse.json({
      message: `Successfully imported ${payments.length} payments`,
      totalAmount: spentCash,
    });
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction on error
    console.error("Error processing inward payments:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    session.endSession(); // End the session
  }
}

export const dynamic = "force-dynamic";
export const maxDuration = 60; // 5 minutes timeout

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();
    // Fetch data from MongoDB
    const payments = await OutwardPayment.find()
      .populate("customerVendorId", "email")
      .lean();

    if (payments.length === 0) {
      return new Response("No data found to export.", { status: 404 });
    }

    // Transform data for the Excel sheet
    const excelData = payments.map((payment) => ({
      ReceiptNo: payment.receiptNo,
      CustomerVendorEmail: payment.customerVendorId?.email || "N/A",
      PaymentDate: payment.paymentDate.toISOString().split("T")[0],
      Payment: payment.payment,
      PaymentType: payment.paymentType,
    }));

    // Create a new workbook and add data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "OutwardPayments");

    // Directory and file path
    const exportDir = join(process.cwd(), "exports");
    const filePath = join(exportDir, "OutwardPayments.xlsx");

    // Ensure the directory exists
    await mkdir(exportDir, { recursive: true });

    // Write the Excel file to the directory
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    await writeFile(filePath, buffer);

    // Return the Excel file to the client
    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="OutwardPayments.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error exporting outward payments:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
