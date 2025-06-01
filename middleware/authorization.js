const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Asumiendo que User tiene un campo `role` o `rol`

// Middleware para validar token y cargar usuario en req.user
const authMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token, permiso no válido.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user; // { id: ..., ... }

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token no válido.",
    });
  }
};

// Middleware para validar si el usuario es admin
const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado.",
      });
    }

    if (user.rol !== "admin") {
      return res.status(403).json({
        msg: "Permiso denegado. Solo administradores.",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error en la validación de permisos.",
    });
  }
};

module.exports = authMiddleware;