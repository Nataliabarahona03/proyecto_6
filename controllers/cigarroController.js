const Cigarro = require("../models/Cigarro");

// Crear un nuevo cigarro (solo admin)
exports.create = async (req, res) => {
  const { name, brand, price, description, img, slug } = req.body;

  try {
    const newCigarro = await Cigarro.create({
      name,
      brand,
      price,
      description,
      img,
      slug,
    });

    res.status(201).json({
      msg: "Cigarro creado con éxito.",
      data: newCigarro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Hubo un error al crear el cigarro.",
    });
  }
};

// Obtener todos los cigarros
exports.readAll = async (req, res) => {
  try {
    const cigarros = await Cigarro.find();

    res.json({
      msg: "Cigarros obtenidos con éxito.",
      data: cigarros,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los cigarros.",
    });
  }
};

// Obtener un cigarro por slug
exports.readOne = async (req, res) => {
  const { slug } = req.params;

  try {
    const cigarro = await Cigarro.findOne({ slug });

    if (!cigarro) {
      return res.status(404).json({
        msg: "Cigarro no encontrado.",
      });
    }

    res.json({
      msg: "Cigarro encontrado con éxito.",
      data: cigarro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al buscar el cigarro.",
    });
  }
};

// Actualizar un cigarro (solo admin)
exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Cigarro.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ msg: "Cigarro no encontrado." });
    }

    res.json({
      msg: "Cigarro actualizado correctamente.",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el cigarro.",
    });
  }
};

// Eliminar un cigarro (solo admin)
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Cigarro.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ msg: "Cigarro no encontrado." });
    }

    res.json({
      msg: "Cigarro eliminado correctamente.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar el cigarro.",
    });
  }
};