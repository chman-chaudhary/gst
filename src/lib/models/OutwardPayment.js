import { Schema, model, models } from "mongoose";

const OutwardPaymentSchema = new Schema({
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

const OutwardPayment =
  models.OutwardPayment || model("OutwardPayment", OutwardPaymentSchema);

export default OutwardPayment;
