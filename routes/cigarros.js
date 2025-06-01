const express = require("express");
const router = express.Router();

const authorization = require("../middleware/authorization");
const isAdmin = require("../middleware/isAdmin");

const cigarroController = require("../controllers/cigarroController");

/**
 * @swagger
 * components:
 *  schemas:
 *    Cigarro:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        brand:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: number
 *        stock:
 *          type: number
 *        nicotineContent:
 *          type: number
 *          description: Contenido de nicotina en mg
 *        slug:
 *          type: string
 *        img:
 *          type: array
 *          items:
 *            type: string
 *      example:
 *        name: "Cigarro Premium"
 *        brand: "Tabacos del Sur"
 *        description: "Cigarro suave y aromÃ¡tico."
 *        price: 1200
 *        stock: 50
 *        nicotineContent: 10
 *        slug: "cigarro-premium"
 *        img: ["https://example.com/cigarro1.jpg"]
 */

/**
 * @swagger
 * /api/cigarros/create:
 *   post:
 *     summary: Crear un nuevo cigarro
 *     tags: [Cigarros]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cigarro'
 *     responses:
 *       200:
 *         description: Cigarro creado exitosamente
 *       400:
 *         description: Error al crear el cigarro
 */
router.post("/create", authorization, cigarroController.create);

/**
 * @swagger
 * /api/cigarros/readall:
 *   get:
 *     summary: Obtener todos los cigarros
 *     tags: [Cigarros]
 *     responses:
 *       200:
 *         description: Lista de todos los cigarros
 *       400:
 *         description: Error al obtener los cigarros
 */
router.get("/readall", cigarroController.readAll);

/**
 * @swagger
 * /api/cigarros/readone/{slug}:
 *   get:
 *     summary: Obtener un cigarro por slug
 *     tags: [Cigarros]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug del cigarro
 *     responses:
 *       200:
 *         description: Datos del cigarro
 *       400:
 *         description: Error al obtener el cigarro
 */
router.get("/readone/:slug", cigarroController.readOne);

/**
 * @swagger
 * /api/cigarros/delete/{id}:
 *   delete:
 *     summary: Eliminar un cigarro (solo admins)
 *     tags: [Cigarros]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cigarro a eliminar
 *     responses:
 *       200:
 *         description: Cigarro eliminado correctamente
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Error al eliminar el cigarro
 */
router.delete("/delete/:id", authorization, isAdmin, cigarroController.delete);

module.exports = router;