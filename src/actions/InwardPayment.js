"use server";

import dbConnect from "@/lib/dbConnect";
import CustomerVendor from "@/lib/models/Leager";
import InwardPayment from "@/lib/models/InwardPayment";
import User from "@/lib/models/User";
import mongoose from "mongoose";

export const AddInwardPayment = async (data, userEmail) => {
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { $inc: { cash: data.payment } },
      { new: true, session }
    );
    if (!user) {
      await session.abortTransaction();
      return { error: "User not found" };
    }

    const customerVendor = await CustomerVendor.findOneAndUpdate(
      { _id: data.customerVendorId, remainingAmount: { $gte: data.payment } },
      { $inc: { remainingAmount: -data.payment } },
      { new: true, session }
    );

    if (!customerVendor) {
      await session.abortTransaction();
      return { message: "Insufficient balance or invalid ID" };
    }
    const inwardPayment = new InwardPayment({ ...data, createdBy: user._id });
    await inwardPayment.save({ session });
    await session.commitTransaction();
    session.endSession();
    return { ok: true, message: "Inward payment added successfully" };
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    console.log(e);
    return { message: "ERROR! while adding inward payment." };
  }
};

export const GetInwardPayments = async (userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return { error: "User not found" };
    }
    const inwardPayments = await InwardPayment.find({
      createdBy: user._id,
    }).populate("customerVendorId");
    return inwardPayments;
  } catch (e) {
    console.log(e);
    return { error: "Error fetching inward payments" };
  }
};

export const GetInwardPaymentById = async (id) => {
  await dbConnect();
  try {
    const inwardPayment = await InwardPayment.findById(id).populate(
      "customerVendorId"
    );
    return inwardPayment;
  } catch (error) {
    console.log(error);
    return { error: "Error fetching outward payment" };
  }
};
