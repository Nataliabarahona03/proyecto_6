const express = require("express");
const router = express.Router();

const authorization = require("../middleware/authorization");
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               country:
 *                 type: string
 *               address:
 *                 type: string
 *               zipcode:
 *                 type: number
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Usuario creado con éxito
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
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
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso con token
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/verify-token:
 *   get:
 *     summary: Verificar token y obtener datos de usuario
 *     tags: [Auth]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado
 */
router.get("/verify-token", authorization, authController.verifyToken);

/**
 * @swagger
 * /api/auth/update:
 *   put:
 *     summary: Actualizar datos del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 */
router.put("/update", authorization, authController.update);

module.exports = router;