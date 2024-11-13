"use server";

import dbConnect from "@/lib/dbConnect";
import ProductGroup from "@/lib/models/ProductGroup";
import User from "@/lib/models/User";

export const AddProductGroup = async (name, userEmail) => {
  try {
    await dbConnect();

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log("user not found");
      return null;
    }

    const productGroup = new ProductGroup({
      name,
      createdBy: user._id,
    });
    const response = await productGroup.save();
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetProductGroups = async (userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      console.log("User not found");
      return null;
    }
    const response = await ProductGroup.find({ createdBy: user._id }).lean();
    if (response) {
      return JSON.parse(JSON.stringify(response));
    }
    return null;
  } catch (error) {
    console.log("Error while getting Product Group");
    return null;
  }
};
