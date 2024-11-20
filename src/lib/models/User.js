import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cash: {
    type: Number,
    default: 0,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
