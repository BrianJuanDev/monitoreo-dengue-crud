// controllers/patientController.js
const Patient = require('../models/patientModel');

// Obtener todos los pacientes
async function getPatients(req, res) {
    try {
        const patients = await Patient.find();  // Obtener todos los pacientes de la base de datos
        res.json(patients);  // Responder con la lista de pacientes
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los pacientes', details: err.message });
    }
}

// Crear un nuevo paciente
async function createPatient(req, res) {
    const { name, age, status } = req.body;  // Desestructuramos los datos enviados en el cuerpo de la solicitud

    try {
        const newPatient = new Patient({ name, age, status });  // Creamos una nueva instancia del modelo de paciente
        await newPatient.save();  // Guardamos el nuevo paciente en la base de datos
        res.status(201).json(newPatient);  // Respondemos con el paciente creado
    } catch (err) {
        res.status(400).json({ error: 'Error al crear el paciente', details: err.message });
    }
}

// Actualizar un paciente
async function updatePatient(req, res) {
    const { id } = req.params;  // Obtenemos el ID del paciente desde los parámetros de la ruta
    const { name, age, status } = req.body;  // Obtenemos los nuevos datos del cuerpo de la solicitud

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, { name, age, status }, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        res.json(updatedPatient);  // Respondemos con el paciente actualizado
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el paciente', details: err.message });
    }
}

// Eliminar un paciente
async function deletePatient(req, res) {
    const { id } = req.params;  // Obtenemos el ID del paciente desde los parámetros de la ruta

    try {
        const deletedPatient = await Patient.findByIdAndDelete(id);  // Eliminamos el paciente de la base de datos
        if (!deletedPatient) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        res.status(204).send();  // Respondemos con un código 204 (sin contenido) indicando que la eliminación fue exitosa
    } catch (err) {
        res.status(400).json({ error: 'Error al eliminar el paciente', details: err.message });
    }
}

module.exports = {
    getPatients,
    createPatient,
    updatePatient,
    deletePatient
};
