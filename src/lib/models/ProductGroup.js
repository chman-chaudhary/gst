import { Schema, model, models } from "mongoose";

const ProductGroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const ProductGroup =
  models.ProductGroup || model("ProductGroup", ProductGroupSchema);

export default ProductGroup;
