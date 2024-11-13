import mongoose, { Schema, model, models } from "mongoose";

const CustomerVendorSchema = new Schema({
  companyType: {
    type: String,
    enum: ["customer", "vendor", "customer/vendor"],
    default: "customer",
  },
  gstin: {
    type: String,
    uppercase: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  registrationType: {
    type: String,
    enum: ["unregistered", "registered"],
  },
  pan: {
    type: String,
    uppercase: true,
    trim: true,
  },
  billingAddress: {
    address1: { type: String, trim: true },
    address2: { type: String, trim: true },
    city: { type: String, trim: true },
    pincode: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  distanceForEwayBill: {
    type: Number,
    min: 0,
  },
  balanceType: {
    type: String,
    enum: ["credit", "debit"],
    default: "credit",
  },
  openingBalance: {
    type: Number,
    default: 0,
  },
  licenseNo: {
    type: String,
    uppercase: true,
    trim: true,
  },
  faxNo: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  dueDays: {
    type: Number,
    min: 0,
  },
  note: {
    type: String,
    trim: true,
  },
  enable: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CustomerVendor =
  models.CustomerVendor || model("CustomerVendor", CustomerVendorSchema);

export default CustomerVendor;
