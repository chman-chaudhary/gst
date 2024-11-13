"use server";

import dbConnect from "@/lib/dbConnect";
import CustomerVendor from "@/lib/models/CustomerVendor";
import User from "@/lib/models/User";

export const getCustomerVendors = async (userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log("User not found");
      return null;
    }

    const response = await CustomerVendor.find({ user: user._id });
    return response;
  } catch (e) {
    console.log("Error while getting Customer/Vendor", e);
    return null;
  }
};

export const AddCustomerVendor = async (customerVendorData, userEmail) => {
  await dbConnect();

  try {
    const user = await User.findOne({ userEmail });

    if (!user) {
      console.log("User not found");
      return null;
    }

    const {
      companyType,
      gstin,
      companyName,
      contactPerson,
      contactNo,
      email,
      registrationType,
      pan,
      address1,
      address2,
      city,
      pincode,
      state,
      country,
      distanceForEwayBill,
      balanceType,
      openingBalance,
      licenseNo,
      faxNo,
      website,
      dueDays,
      note,
      enable,
    } = customerVendorData;

    // Validate required fields
    if (
      !companyType ||
      !gstin ||
      !companyName ||
      !contactPerson ||
      !contactNo ||
      !email ||
      !registrationType ||
      !pan ||
      !address1 ||
      !city ||
      !pincode ||
      !state ||
      !country ||
      distanceForEwayBill === undefined ||
      !balanceType ||
      openingBalance === undefined ||
      dueDays === undefined
    ) {
      return { success: false, error: "All required fields must be filled" };
    }

    const billingAddress = {
      address1,
      address2,
      city,
      pincode,
      state,
      country,
    };

    // Create a new CustomerVendor document
    const newCustomerVendor = new CustomerVendor({
      companyType,
      gstin,
      companyName,
      contactPerson,
      contactNo,
      email,
      registrationType,
      pan,
      billingAddress,
      distanceForEwayBill,
      balanceType,
      openingBalance,
      licenseNo,
      faxNo,
      website,
      dueDays,
      note,
      enable,
      user: user._id,
    });

    await newCustomerVendor.save();

    return {
      success: true,
      message: "Customer/Vendor added successfully",
    };
  } catch (error) {
    console.error("Error adding Customer/Vendor:", error);
    return { success: false, error: "Internal Server Error" };
  }
};

export const getCustomerVendorById = async (_id) => {
  await dbConnect();
  try {
    const response = await CustomerVendor.findById(_id).lean();
    if (response) {
      const res = JSON.parse(JSON.stringify(response));
      return res;
    }
    return null;
  } catch (e) {
    console.log("Error while getting Customer/Vendor by id");
    return null;
  }
};

export const deleteCustomerVendor = async (_id) => {
  await dbConnect();
  try {
    const res = await CustomerVendor.findByIdAndDelete(_id);
    if (res) return true;
    return false;
  } catch (e) {
    console.log("Error while deleting Customer/Vendor");
    return false;
  }
};
