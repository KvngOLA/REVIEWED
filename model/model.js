const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "Guest"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
