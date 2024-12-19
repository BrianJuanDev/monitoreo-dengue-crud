// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const { createPatient, updatePatient, deletePatient, getPatients } = require('../controllers/patientController');

// Rutas para pacientes
router.get('/', getPatients); // Obtener todos los pacientes
router.post('/', createPatient); // Crear un nuevo paciente
router.put('/:id', updatePatient); // Actualizar un paciente por ID
router.delete('/:id', deletePatient); // Eliminar un paciente por ID

module.exports = router;
