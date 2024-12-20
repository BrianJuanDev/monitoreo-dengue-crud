// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const { check, validationResult } = require('express-validator');
const { createPatient, updatePatient, deletePatient, getPatients } = require('../controllers/patientController');

// Rutas para pacientes
router.get('/', authenticate, getPatients); // Obtener todos los pacientes

router.post(
    '/', 
    [
      authenticate, 
      check('name','El nombre es obligatorio').notEmpty(),
      check('age','La edad debe ser un número válido').isNumeric(),
      check('status', 'El estado es obligatorio y debe ser A, B o C').isIn(['A','B','C']),
    ], 
    createPatient
); // Crear un nuevo paciente

router.put(
    '/:id', 
    [
        authenticate, 
        check('name', 'El nombre es obligatorio').optional().notEmpty(),
        check('age', 'La edad debe ser un número válido').optional().isNumeric(),
        check('status', 'El estado debe ser A, B o C').optional().isIn(['A', 'B', 'C']),
    ],
    updatePatient
); // Actualizar un paciente por ID

router.delete('/:id', authenticate, deletePatient); // Eliminar un paciente por ID

module.exports = router;
