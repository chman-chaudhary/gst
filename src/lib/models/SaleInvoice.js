import { Schema, model, models } from "mongoose";

// Product Schema
const ProductRowSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  hsnCode: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  uom: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  cess: {
    type: Number,
    default: 0,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Note Schema
const NoteSchema = new Schema({
  title: String,
  details: String,
});

// Customer Info Schema
const CustomerInfoSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "CustomerVendor",
    required: true,
  },
  contactPerson: String,
  phone: {
    type: String,
    required: true,
  },
  gstPan: {
    type: String,
    required: true,
  },
  revCharge: String,
  placeOfSupply: {
    type: String,
    required: true,
  },
});

// Invoice Details Schema
const InvoiceDetailsSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  challanNo: String,
  challanDate: Date,
  poNo: String,
  poDate: Date,
  lrNo: String,
  lrDate: Date,
  eWayNo: String,
  delivery: String,
});

// Additional Details Schema
const AdditionalDetailsSchema = new Schema({
  dueDate: Date,
  notes: [NoteSchema],
  tcs: {
    isPercentage: {
      type: Boolean,
      default: false,
    },
    isPositive: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  discount: {
    isPercentage: {
      type: Boolean,
      default: false,
    },
    isPositive: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  paymentType: String,
});

// Totals Schema
const TotalsSchema = new Schema({
  totalTaxable: {
    type: Number,
    required: true,
    min: 0,
  },
  totalTax: {
    type: Number,
    required: true,
    min: 0,
  },
  grandTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  payment: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Main Invoice Schema
const InvoiceSchema = new Schema(
  {
    customerInfo: CustomerInfoSchema,
    invoiceDetails: InvoiceDetailsSchema,
    productRows: [ProductRowSchema],
    additionalDetails: AdditionalDetailsSchema,
    totals: TotalsSchema,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true, // Ensure product has a creator
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = models.Invoice || model("Invoice", InvoiceSchema);

export default Invoice;
