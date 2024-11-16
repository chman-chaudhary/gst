"use server";

import dbConnect from "@/lib/dbConnect";
import { ProductGroupSchema } from "@/lib/models/ProductGroup";
import ProductService from "@/lib/models/ProductServices";
import User from "@/lib/models/User";
import mongoose from "mongoose";

export const AddProductService = async (data, userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      console.log("User not found");
      return null;
    }
    const productService = new ProductService({ ...data, createdBy: user._id });
    await productService.save();
    return { message: "Successfully added product service", ok: true };
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const GetProductServices = async (userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      console.log("User not found");
      return null;
    }
    if (!mongoose.models.ProductGroup) {
      mongoose.model("ProductGroup", ProductGroupSchema);
    }
    const productServices = await ProductService.find({
      createdBy: user._id,
    }).populate("productGroup");
    return productServices;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const DeleteProductService = async (id) => {
  await dbConnect();
  try {
    const response = await ProductService.findByIdAndDelete(id);
    if (response) return true;
    return false;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const GetProductServiceById = async (id, userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      console.log("User not found");
      return null;
    }
    if (!mongoose.models.ProductGroup) {
      mongoose.model("ProductGroup", ProductGroupSchema);
    }
    const productService = await ProductService.findById(id)
      .populate("productGroup")
      .lean();
    if (productService) {
      const response = JSON.parse(JSON.stringify(productService));
      return response;
    }
    return null;
  } catch (e) {
    console.log("Error while fetching product service by id", e);
    return null;
  }
};
