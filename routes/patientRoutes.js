// routes/patientRoutes.js
const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const { check, validationResult } = require('express-validator');
const { createPatient, updatePatient, deletePatient, getPatients } = require('../controllers/patientController');
const Patient = require('../models/patientModel');

const router = express.Router();

/**
 * @swagger
 * /api/pacientes/search:
 *   get:
 *     summary: Buscar pacientes por nombre y estado
 *     description: Devuelve una lista de pacientes que coincidan con los filtros proporcionados.
 *     tags:
 *       - Pacientes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del paciente (búsqueda parcial).
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Estado del paciente.
 *     responses:
 *       200:
 *         description: Lista de pacientes encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *       401:
 *         description: No autorizado, token inválido o faltante.
 *       500:
 *         description: Error en la búsqueda de pacientes.
 */

router.get('/search', authenticate, async (req, res) => { 
    const { name, status } = req.query; // Obtener los filtros desde los parámetros de consulta
    try {
        const query = {};
        if (name) query.name = { $regex: name, $options: 'i' }; // Búsqueda parcial por nombre
        if (status) query.status = status; // Filtrar por estado

        const patients = await Patient.find(query); // Consultar la base de datos con los filtros
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar pacientes', details: err.message });
    }
});

//Crear un nuevo paciente con validaciones previas
router.post(
    '/', 
    [
      authenticate, 
      check('name','El nombre es obligatorio').notEmpty(),
      check('age','La edad debe ser un número válido').isNumeric(),
      check('status', 'El estado es obligatorio y debe ser A, B o C').isIn(['A','B','C']),
    ], 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Si no hay errores, pasa al controlador
    },
    createPatient
); 

// Actualizar un paciente con validaciones opcionales
router.put(
    '/:id', 
    [
        authenticate, 
        check('name', 'El nombre es obligatorio').optional().notEmpty(),
        check('age', 'La edad debe ser un número válido').optional().isNumeric(),
        check('status', 'El estado debe ser A, B o C').optional().isIn(['A', 'B', 'C']),
    ],
    updatePatient
); 

// Eliminar un paciente por ID
router.delete('/:id', authenticate, deletePatient); 

module.exports = router;
