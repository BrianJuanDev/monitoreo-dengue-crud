// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Rutas de autenticación
router.post('/register', register); // Registro de usuario
router.post('/login', login); // Login de usuario

module.exports = router;
