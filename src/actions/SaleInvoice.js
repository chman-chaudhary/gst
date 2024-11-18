"use server";

import dbConnect from "@/lib/dbConnect";
import Invoice from "@/lib/models/SaleInvoice";
import User from "@/lib/models/User";
import mongoose from "mongoose";

// Add Sale Invoice
export const AddSaleInvoice = async (invoiceData, userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return { ok: false, message: "User not found" };
    }

    // Create new invoice instance
    const newInvoice = new Invoice({ ...invoiceData, createdBy: user._id });

    // Save the invoice
    const res = await newInvoice.save();
    console.log(res);
    if (!res) {
      return { ok: false, message: "Error while add Sale Invoice" };
    }
    return { ok: true, message: "Sale Invoice added successfully" };
  } catch (error) {
    // Handle validation errors
    console.log(error);
    return { ok: false, message: "Error while creating sale invoice" };
  }
};

// Get All Sale Invoices with pagination and filtering
export const GetSaleInvoices = async (userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return { ok: false, message: "User not found" };
    }
    // Find all invoices
    const invoices = await Invoice.find({ createdBy: user._id });
    return { ok: true, invoices };
  } catch (error) {
    // Handle validation errors
    console.log(error);
    return { ok: false, message: "Error while fetching sale invoices" };
  }
};

// Get Sale Invoice By Id
export const getSaleInvoiceById = async (id) => {
  await dbConnect();
  try {
    // Find invoice
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return { ok: false, message: "Invoice not found" };
    }
    return {
      ok: true,
      invoice,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Invoice not found" };
  }
};

// Delete Sale Invoice
export const deleteSaleInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice ID format",
      });
    }

    // Find and delete invoice
    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
      data: deletedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting invoice",
      error: error.message,
    });
  }
};

// Update Sale Invoice
export const updateSaleInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice ID format",
      });
    }

    // Find and update invoice
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedInvoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: updatedInvoice,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating invoice",
      error: error.message,
    });
  }
};

// export const getSaleInvoices = async (req, res) => {
//   await dbConnect();
//   try {
//     const {
//       page = 1,
//       limit = 10,
//       sortBy = "createdAt",
//       sortOrder = "desc",
//       startDate,
//       endDate,
//       customerName,
//       invoiceNumber,
//     } = req.query;

//     Build filter object
//     let filter = {};

//     Date range filter
//     if (startDate && endDate) {
//       filter["invoiceDetails.date"] = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate),
//       };
//     }

//     Customer name filter (case-insensitive)
//     if (customerName) {
//       filter["customerInfo.name"] = {
//         $regex: customerName,
//         $options: "i",
//       };
//     }

//     Invoice number filter
//     if (invoiceNumber) {
//       filter["invoiceDetails.number"] = invoiceNumber;
//     }

//     Calculate skip value for pagination
//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     Build sort object
//     const sort = {
//       [sortBy]: sortOrder === "desc" ? -1 : 1,
//     };

//     Get total count of documents matching the filter
//     const total = await Invoice.countDocuments(filter);

//     Fetch invoices
//     const invoices = await Invoice.find(filter)
//       .sort(sort)
//       .skip(skip)
//       .limit(parseInt(limit));

//     res.status(200).json({
//       success: true,
//       data: invoices,
//       pagination: {
//         total,
//         page: parseInt(page),
//         totalPages: Math.ceil(total / parseInt(limit)),
//         limit: parseInt(limit),
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching invoices",
//       error: error.message,
//     });
//   }
// };
