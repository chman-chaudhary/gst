const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ["Product", "Service"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },
  barcodeSerialNo: {
    type: String,
  },
  hsnSacCode: {
    type: String,
  },
  unitOfMeasurement: {
    type: String,
  },
  conversion: {
    type: String,
  },
  taxPricing: {
    productType: {
      type: String,
      enum: ["Taxable", "Non-Taxable"],
      required: true,
    },
    gstPercent: {
      type: Number,
    },
    cessPercent: {
      type: Number,
    },
    cessAmount: {
      type: Number,
    },
    fixed: {
      type: Boolean,
    },
    noITC: {
      type: Boolean,
    },
    ineligibleForInputCredit: {
      type: Boolean,
    },
  },
  manageStock: {
    type: String,
    enum: ["Normal", "Batch", "Serial No."],
  },
  sellPrice: {
    type: Number,
  },
  sellPriceInclTax: {
    type: Number,
  },
  purchasePrice: {
    type: Number,
  },
  purchasePriceInclTax: {
    type: Number,
  },
  lowStockAlert: {
    type: Number,
  },
  productGroup: {
    type: String,
  },
  additionalDetails: {
    discountPercent: {
      type: Number,
    },
    discountAmount: {
      type: Number,
    },
  },
  nonSalableProduct: {
    type: Boolean,
  },
  enabled: {
    type: Boolean,
  },
});
