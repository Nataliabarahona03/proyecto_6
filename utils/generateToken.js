const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    rol: user.rol, 
  };

  const secret = process.env.JWT_SECRET || "secretkey";

  const options = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, secret, options);
};

module.exports = generateToken;