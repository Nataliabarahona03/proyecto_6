const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    // El middleware debe ejecutarse después de que authMiddleware haya puesto req.user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado." });
    }

    if (user.rol !== "admin") {
      return res.status(403).json({ msg: "Acceso denegado. Solo administradores." });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno en la verificación de administrador." });
  }
};

module.exports = isAdmin;