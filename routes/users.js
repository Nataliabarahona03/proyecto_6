const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authorization");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        lastname:
 *          type: string
 *        cart:
 *          type: array
 *          items:
 *            type: string
 *        country:
 *          type: string
 *        address:
 *          type: string
 *        zipcode:
 *          type: number
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        receipts:
 *          type: array
 *          items:
 *            type: string
 *      example:
 *        name: "Mike"
 *        lastname: "Nieva"
 *        country: "Mexico"
 *        address: "123 Main St"
 *        zipcode: 12345
 *        email: "mike@email.com"
 *        password: "password123"
 *        receipts: []
 */

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: El usuario se creó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post(
  "/create",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({ min: 6 }),
  ],
  userController.create
);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "mike@email.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *             example:
 *               token: "token"
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /api/users/verifytoken:
 *   get:
 *     summary: Verificar token de usuario
 *     tags: [Users]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido
 */
router.get("/verifytoken", authMiddleware, userController.verifyToken);

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Actualizar información del usuario
 *     tags: [Users]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: El usuario se actualizó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 */
router.put("/update", authMiddleware, userController.update);

module.exports = router;
