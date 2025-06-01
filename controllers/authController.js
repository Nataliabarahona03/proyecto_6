const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Crear y devolver un JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { name, lastname, country, address, zipcode, email, password, rol } = req.body;

    // Verifica que el email no esté registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "El correo ya está registrado." });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el usuario
    const newUser = await User.create({
      name,
      lastname,
      country,
      address,
      zipcode,
      email,
      password: hashedPassword,
      rol: rol || "user",
    });

    // Devuelve el token
    const token = generateToken(newUser);

    res.status(201).json({
      msg: "Usuario registrado correctamente.",
      user: {
        id: newUser._id,
        name: newUser.name,
        lastname: newUser.lastname,
        email: newUser.email,
        rol: newUser.rol,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Credenciales inválidas." });
    }

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Credenciales inválidas." });
    }

    // Genera el token
    const token = generateToken(user);

    res.status(200).json({
      msg: "Inicio de sesión exitoso.",
      user: {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        rol: user.rol,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

// Verificar token y obtener datos de usuario
exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Actualizar datos del usuario autenticado
exports.update = async (req, res) => {
  try {
    const updates = req.body;
    const userId = req.userId;

    // No permitir actualizar password aquí
    if (updates.password) delete updates.password;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json({
      msg: "Usuario actualizado correctamente",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};