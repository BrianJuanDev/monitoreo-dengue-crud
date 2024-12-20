// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const { createPatient, updatePatient, deletePatient, getPatients } = require('../controllers/patientController');

// Rutas para pacientes
router.get('/', authenticate, getPatients); // Obtener todos los pacientes
router.post('/', authenticate, createPatient); // Crear un nuevo paciente
router.put('/:id', authenticate, updatePatient); // Actualizar un paciente por ID
router.delete('/:id', deletePatient); // Eliminar un paciente por ID

module.exports = router;
