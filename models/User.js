const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    default: "",
  },
  cart: {
    type: mongoose.Types.ObjectId,
    ref: "Cart",
    default: null,
  },
  country: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  zipcode: {
    type: Number,
    default: 0,
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
  rol: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  receipts: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;