"use server";

import dbConnect from "@/lib/dbConnect";
import Leager from "@/lib/models/Leager";
import User from "@/lib/models/User";
import mongoose from "mongoose";

export const getLeagers = async (userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log("User not found");
      return null;
    }

    const response = await Leager.find({ user: user._id }).lean();
    return JSON.parse(JSON.stringify(response));
  } catch (e) {
    console.log("Error while getting Leager", e);
    return null;
  }
};

export const AddLeager = async (LeagerData, userEmail) => {
  await dbConnect();

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log("User not found");
      return { success: false, message: "User not found" };
    }

    const {
      businessType,
      businessName,
      contactPerson,
      email,
      aadhar,
      address,
      city,
      pincode,
      state,
      country,
    } = LeagerData;

    // Validate required fields
    if (
      !businessType ||
      !businessName ||
      !contactPerson ||
      !email ||
      !aadhar ||
      !address ||
      !city ||
      !pincode ||
      !state ||
      !country
    ) {
      return { success: false, error: "All required fields must be filled" };
    }

    // Create a new Leager document
    const newLeager = new Leager({ ...LeagerData, user: user._id });

    await newLeager.save();

    return {
      success: true,
      message: "Leager added successfully",
    };
  } catch (error) {
    console.error("Error adding Leager:", error);
    return { success: false, error: "Internal Server Error" };
  }
};

export const getLeagerById = async (_id) => {
  await dbConnect();
  try {
    const response = await Leager.findById(_id).lean();
    if (response) {
      const res = JSON.parse(JSON.stringify(response));
      return res;
    }
    return null;
  } catch (e) {
    console.log("Error while getting Leager by id");
    return null;
  }
};

export const deleteLeager = async (_id) => {
  await dbConnect();
  try {
    const res = await Leager.findByIdAndDelete(_id);
    if (res) return true;
    return false;
  } catch (e) {
    console.log("Error while deleting Leager");
    return false;
  }
};

export const updateLeager = async (id, updateData, userEmail) => {
  try {
    // Ensure the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, message: "Invalid Leager ID" };
    }

    // Find the Leager and verify ownership
    const leager = await Leager.findById(id);
    if (!leager) {
      return { success: false, message: "Leager not found" };
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (String(leager.user) !== String(user._id)) {
      return {
        success: false,
        message: "Unauthorized: You cannot update this Leager",
      };
    }

    // Update the Leager with new data
    const updatedLeager = await Leager.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } // Returns the updated document and enforces validation
    );

    if (!updatedLeager) {
      return { success: false, message: "Error updating Leager" };
    }

    return {
      success: true,
      message: "Leager updated successfully",
    };
  } catch (error) {
    console.error("Error updating Leager:", error);
    return {
      success: false,
      message: "An error occurred while updating the Leager",
    };
  }
};
