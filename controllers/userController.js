const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Crear nuevo usuario
exports.create = async (req, res) => {
  const { name, lastname, email, password, country, address, zipcode } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe." });
    }

    user = new User({
      name,
      lastname,
      email,
      password,
      country,
      address,
      zipcode,
    });

    // Hash del password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Crear token
    const payload = {
      user: {
        id: user.id,
        role: user.rol,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ msg: "Usuario creado con éxito.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el usuario." });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Credenciales inválidas." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Credenciales inválidas." });

    const payload = {
      user: {
        id: user.id,
        role: user.rol,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ msg: "Login exitoso.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

// Verificar token y retornar datos del usuario
exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado." });

    res.json({ msg: "Token válido.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al verificar token." });
  }
};

// Actualizar datos del usuario autenticado
exports.update = async (req, res) => {
  try {
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedData,
      { new: true }
    ).select("-password");

    res.json({
      msg: "Perfil actualizado correctamente.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error actualizando el perfil." });
  }
};

// Obtener todos los usuarios (solo admin)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "No autorizado." });
    }

    const users = await User.find().select("-password");

    res.json({
      msg: "Usuarios encontrados.",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error obteniendo los usuarios." });
  }
};

// Eliminar un usuario (solo admin)
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "No autorizado." });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Usuario eliminado correctamente.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error eliminando usuario." });
  }
};