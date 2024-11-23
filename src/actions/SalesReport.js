"use server";

import dbConnect from "@/lib/dbConnect";
import Invoice from "@/lib/models/SaleInvoice";

export default async function SalesReport(from, to) {
  try {
    // Connect to the database
    await dbConnect();

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate) || isNaN(toDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Query the database for invoices between the dates
    const invoices = await Invoice.find({
      "invoiceDetails.date": {
        $gte: fromDate,
        $lte: toDate,
      },
    })
      .sort({ "invoiceDetails.date": 1 })
      .lean(); // Sort by date
    return JSON.parse(JSON.stringify(invoices));
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return { error: "Internal server error" };
  }
}
