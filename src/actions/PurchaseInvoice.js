"use server";

import dbConnect from "@/lib/dbConnect";
import CustomerVendor from "@/lib/models/CustomerVendor";
import PurchaseInvoice from "@/lib/models/PurchaseInvoice";
import User from "@/lib/models/User";

// Add Sale Invoice
export const AddPurchaseInvoice = async (invoiceData, userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return { ok: false, message: "User not found" };
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $inc: { cash: -invoiceData.totals.payment },
    });

    const remainingAmount =
      invoiceData.totals.grandTotal - invoiceData.totals.payment;
    console.log("Remaining Amount:", remainingAmount);
    if (remainingAmount) {
      const updatedCustomer = await CustomerVendor.findByIdAndUpdate(
        invoiceData?.vendorInfo.vendorId,
        { remainingAmount: remainingAmount }
      );
    }
    // Create new invoice instance
    const newInvoice = new PurchaseInvoice({
      ...invoiceData,
      createdBy: user._id,
    });

    // Save the invoice
    const res = await newInvoice.save();
    console.log(res);
    if (!res) {
      return { ok: false, message: "Error while add Purchase Invoice" };
    }
    return { ok: true, message: "Purchase Invoice added successfully" };
  } catch (error) {
    // Handle validation errors
    console.log(error);
    return { ok: false, message: "Error while creating Purchase invoice" };
  }
};

// Get All Purchase Invoices with pagination and filtering
export const GetPurchaseInvoices = async (userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return { ok: false, message: "User not found" };
    }
    // Find all invoices
    const invoices = await PurchaseInvoice.find({
      createdBy: user._id,
    }).populate({
      path: "vendorInfo.vendorId",
      model: "CustomerVendor", // Ensure this matches your CustomerVendor model name
    });
    return { ok: true, invoices };
  } catch (error) {
    // Handle validation errors
    console.log(error);
    return { ok: false, message: "Error while fetching sale invoices" };
  }
};
