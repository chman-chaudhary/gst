import mongoose, { Schema, model, models } from "mongoose";

const LeagerSchema = new Schema({
  businessType: {
    type: String,
    enum: ["customer", "vendor", "customer/vendor"],
    default: "customer",
  },
  gstin: {
    type: String,
    uppercase: true,
    trim: true,
  },
  businessName: {
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
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  registrationType: {
    type: String,
    enum: ["regular", "composite", ""],
  },
  aadhar: {
    type: String,
    uppercase: true,
    trim: true,
  },
  address: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  pincode: { type: String, trim: true, required: true },
  state: { type: String, trim: true, required: true },
  country: { type: String, trim: true, required: true },
  remainingAmount: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Leager = models.Leager || model("Leager", LeagerSchema);

export default Leager;
