import mongoose from "mongoose";

export const ProductGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ProductGroup =
  mongoose.models.ProductGroup ||
  mongoose.model("ProductGroup", ProductGroupSchema);

export default ProductGroup;
