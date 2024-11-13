import { Schema, model, models } from "mongoose";

// Define the schema for the Product
const ProductServiceSchema = new Schema(
  {
    itemType: {
      type: String,
      enum: ["Product", "Service"],
      required: true, // 'Product' or 'Service' must be selected
    },
    name: {
      type: String,
      required: true, // Name is required
      trim: true, // Remove leading and trailing whitespace
    },
    productDescription: {
      type: String,
      trim: true, // Remove leading and trailing whitespace
    },
    barcodeOrSerialNo: {
      type: String,
      trim: true, // Remove leading and trailing whitespace
    },
    hsnSacCode: {
      type: String,
      trim: true, // HSN Code should be a string (numeric or alphanumeric)
    },
    unitOfMeasurement: {
      type: String,
      enum: [
        "kg", // Kilogram
        "g", // Gram
        "ltr", // Liter
        "ml", // Milliliter
        "m", // Meter
        "cm", // Centimeter
        "mm", // Millimeter
        "sq.m", // Square meter
        "sq.ft", // Square feet
        "ft", // Feet
        "in", // Inch
        "pcs", // Pieces
        "box", // Box (can represent a quantity or package)
        "set", // Set
        "carton", // Carton
        "dozen", // Dozen (12 items)
        "bag", // Bag
      ],
      required: true, // Unit of Measurement must be provided
      trim: true, // Remove leading and trailing whitespace
    },
    conversion: {
      type: String,
      trim: true,
    },
    taxAndPricing: {
      gstPercentage: {
        type: Number,
        min: 0,
        max: 100,
      },
      cessPercentage: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
    noItc: {
      type: Boolean, // Whether the product is ineligible for Input Tax Credit
    },
    normalBatchSerialNo: {
      type: String,
      trim: true, // Batch or Serial Number
    },
    availableQty: {
      type: Number,
      min: 0, // Can't be less than 0
      default: 0,
    },
    sellPrice: {
      type: Number,
      required: true, // Sell Price is required
      min: 0,
    },
    sellPriceInclTax: {
      type: Number,
      min: 0,
    },
    purchasePrice: {
      type: Number,
      required: true, // Purchase Price is required
      min: 0,
    },
    purchasePriceInclTax: {
      type: Number,
      min: 0,
    },
    productGroup: {
      type: Schema.Types.ObjectId,
      ref: "ProductGroup", // Reference to the ProductGroup schema
      required: true, // Each product must belong to a group
    },
    discount: {
      type: Number,
      min: 0,
      max: 100, // Percentage discount
    },
    nonSalableProduct: {
      type: Boolean,
      default: false, // Whether product is non-salable
    },
    enable: {
      type: Boolean,
      default: true, // If the product is visible in all documents
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true, // Ensure product has a creator
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const ProductService =
  models.ProductService || model("ProductService", ProductServiceSchema);

export default ProductService;
