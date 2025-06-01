const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

require("dotenv").config();

const port = process.env.PORT || 4000;
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`;

const connectDB = require("./config/db");
connectDB();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cigarros API",
      version: "1.0.0",
      description: "API para gestión de usuarios y cigarros",
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-auth-token",
        },
      },
    },
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(cors());

// Para parsear JSON en todas las rutas menos en /api/checkout/create-order (si la tienes)
app.use((req, res, next) => {
  if (req.originalUrl === "/api/checkout/create-order") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Rutas de la API
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/cigarros", require("./routes/cigarros"));

// Ruta Swagger UI para documentación
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Manejo básico de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});