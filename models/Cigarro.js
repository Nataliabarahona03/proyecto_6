const mongoose = require("mongoose");

const cigarroSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  nicotineContent: {
    type: Number, // en mg, por ejemplo
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: [String], // array de URLs o paths de imagenes
    default: [],
  },
});

const Cigarro = mongoose.model("Cigarro", cigarroSchema);

module.exports = Cigarro;