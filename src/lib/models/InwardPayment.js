import { Schema, model, models } from "mongoose";

const InwardPaymentSchema = new Schema({
  receiptNo: {
    type: Number,
    required: true,
  },
  customerVendorId: {
    type: Schema.Types.ObjectId,
    ref: "CustomerVendor",
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentType: {
    type: String,
    enum: ["CASH", "CHEQUE", "ONLINE", "BANK", "TDS"],
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const InwardPayment =
  models.InwardPayment || model("InwardPayment", InwardPaymentSchema);

export default InwardPayment;
