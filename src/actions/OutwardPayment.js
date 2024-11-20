"use server";

import dbConnect from "@/lib/dbConnect";
import CustomerVendor from "@/lib/models/CustomerVendor";
import OutwardPayment from "@/lib/models/OutwardPayment";
import User from "@/lib/models/User";
import mongoose from "mongoose";

export const AddOutwardPayment = async (data, userEmail) => {
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { $inc: { cash: -data.payment } },
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
    const outwardPayment = new OutwardPayment({ ...data, createdBy: user._id });
    await outwardPayment.save({ session });
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

export const GetOutwardPayments = async (userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return { error: "User not found" };
    }
    const outwardPayments = await OutwardPayment.find({
      createdBy: user._id,
    }).populate("customerVendorId");
    return outwardPayments;
  } catch (e) {
    console.log(e);
    return { error: "Error fetching inward payments" };
  }
};

export const GetOutwardPaymentById = async (id) => {
  await dbConnect();
  try {
    const outwardPayment = await OutwardPayment.findById(id).populate(
      "customerVendorId"
    );
    return outwardPayment;
  } catch (error) {
    console.log(error);
    return { error: "Error fetching outward payment" };
  }
};
