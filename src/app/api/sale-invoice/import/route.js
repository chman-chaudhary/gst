// pages/api/invoices.js
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";
import * as XLSX from "xlsx";
import dbConnect from "@/lib/dbConnect";
import CustomerVendor from "@/lib/models/CustomerVendor";
import User from "@/lib/models/User";
import mongoose from "mongoose";
import Invoice from "@/lib/models/Invoice";

export async function POST(request) {
  const session = await mongoose.startSession();
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const createdByEmail = formData.get("createdByEmail");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!createdByEmail) {
      return NextResponse.json(
        { error: "User  email is required" },
        { status: 400 }
      );
    }

    if (isNaN(paymentAmount) || paymentAmount < 0) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    const uploadDir = join(process.cwd(), "uploads");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
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

    await dbConnect();
    session.startTransaction();

    const requiredFields = [
      "customerEmail",
      "invoiceNumber",
      "invoiceDate",
      "total",
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

    const uniqueEmails = [
      ...new Set(sheetData.map((row) => row.customerEmail)),
    ];
    const customers = await CustomerVendor.find({
      email: { $in: uniqueEmails },
    })
      .session(session)
      .lean();
    const customerMap = customers.reduce((map, vendor) => {
      map[vendor.email] = vendor._id;
      return map;
    }, {});

    const missingCustomers = uniqueEmails.filter(
      (email) => !customerMap[email]
    );
    if (missingCustomers.length > 0) {
      await session.abortTransaction();
      return NextResponse.json(
        {
          error: `Customer not found for emails: ${missingCustomers.join(
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

    const invoices = sheetData.map((row) => {
      const customerId = customerMap[row.customerEmail];
      return {
        customerInfo: {
          customerId,
          contactPerson: row.contactPerson,
          phone: row.phone,
          gstPan: row.gstPan,
          placeOfSupply: row.placeOfSupply,
        },
        invoiceDetails: {
          type: row.type,
          number: row.invoiceNumber,
          date: new Date(row.invoiceDate),
          challanNo: row.challanNo,
          challanDate: row.challanDate,
        },
        productRows: row.productRows, // Assuming productRows is an array of objects in your Excel
        totals: {
          totalTaxable: row.totalTaxable,
          totalTax: row.totalTax,
          grandTotal: row.total,
          payment: row.payment,
        },
        createdBy: createdByUser._id,
      };
    });

    await Invoice.insertMany(invoices, { session });

    // Update CustomerVendor remainingAmount and User cash
    for (const invoice of invoices) {
      const remainingAmount =
        invoice.totals.grandTotal - invoice.totals.payment;

      // Update CustomerVendor remainingAmount if there is any due payment
      if (remainingAmount > 0) {
        await CustomerVendor.findByIdAndUpdate(
          invoice.customerInfo.customerId,
          { $inc: { remainingAmount: remainingAmount } },
          { session }
        );
      }

      // Update User cash
      await User.findByIdAndUpdate(
        createdByUser._id,
        { $inc: { cash: paymentAmount } },
        { session }
      );
    }

    await session.commitTransaction();

    return NextResponse.json({
      message: `Successfully imported ${invoices.length} invoices`,
    });
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction on error
    console.error("Error processing invoice import:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    session.endSession(); // End the session
  }
}

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes timeout

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  try {
    await dbConnect();
    const invoices = await Invoice.find()
      .populate("customerInfo.customerId", "email")
      .lean();

    if (invoices.length === 0) {
      return new Response("No data found to export.", { status: 404 });
    }

    const excelData = invoices.map((invoice) => ({
      InvoiceNumber: invoice.invoiceDetails.number,
      CustomerEmail: invoice.customerInfo.customerId?.email || "N/A",
      InvoiceDate: invoice.invoiceDetails.date.toISOString().split("T")[0],
      Total: invoice.totals.grandTotal,
      Payment: invoice.totals.payment, // Include payment in the export
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

    const exportDir = join(process.cwd(), "exports");
    const filePath = join(exportDir, "Invoices.xlsx");

    await mkdir(exportDir, { recursive: true });

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    await writeFile(filePath, buffer);

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="Invoices.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error exporting invoices:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
