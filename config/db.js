const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
 
   await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos conectada correctamente");
  } catch (error) {
    console.error("Error conectando a la base de datos:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;