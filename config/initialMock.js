const mongoose = require("mongoose");
require("dotenv").config({ path: "./../.env" });

const Product = require("../models/Product"); 

// Lista de productos 
const productos = [
  {
    name: "Cigarro Lucky Strike",
    prices: [
      {
        size: "Cajetilla 20 unidades",
        price: 4500,
        description: "Clásico sabor con filtro.",
      },
      {
        size: "Cajetilla 10 unidades",
        price: 2600,
        description: "Ahorro por cantidad.",
      },
    ],
    img: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Lucky_Strike_Box.jpg/640px-Lucky_Strike_Box.jpg",
    ],
    currency: "clp",
    description: "Cigarros Lucky Strike tradicionales, reconocidos por su sabor fuerte.",
    slug: "lucky-strike",
  },
  {
    name: "Cigarro Marlboro",
    prices: [
      {
        size: "Cajetilla 20 unidades",
        price: 4500,
        description: "Suave y equilibrado.",
      },
      {
        size: "Cajetilla 10 unidades",
        price: 2600,
        description: "Ahorro por cantidad.",
      },
    ],
    img: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Marlboro-gold-cigarettes.jpg/640px-Marlboro-gold-cigarettes.jpg",
    ],
    currency: "clp",
    description: "Una opción más suave de la clásica línea Marlboro.",
    slug: "marlboro-gold",
  },
];

const seedProducts = async (items) => {
  try {
    await Product.insertMany(items);
    console.log("Productos de cigarros insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar los productos:", error);
  }
};

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await mongoose.connection.db.dropDatabase(); // Limpia toda la base
    await seedProducts(productos);

    process.exit(0);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

connectDB();