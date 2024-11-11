"use server";

import dbConnect from "@/lib/dbConnect";
import customervendor from "@/lib/models/CustomerVendor";

export const getCustomerVendors = async () => {
  await dbConnect();
  try {
    const response = await customervendor.find();
    return response;
  } catch (e) {
    console.log("Error while getting Customer/Vendor", e);
    return null;
  }
};

export const AddCustomerVendor = async (customerVendorData) => {
  await dbConnect();

  try {
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
    const newCustomerVendor = new customervendor({
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
    const response = await customervendor.findById(_id).lean();
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
    const res = await customervendor.findByIdAndDelete(_id);
    if (res) return true;
    return false;
  } catch (e) {
    console.log("Error while deleting Customer/Vendor");
    return false;
  }
};
