const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/pacientes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar con MongoDB:', err));

const Paciente = mongoose.model('Paciente', new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    grupo: { type: String, enum: ['A', 'B', 'C'], required: true }
}));

// Ruta inicial
app.get('/', (req, res) => {
    res.send('Bienvenido al sistema para pacientes con dengue');
});

app.get('/pacientes', async (req, res) => {
    try {
        const paciente = new Paciente(req.body);
        await paciente.save();
        res.status(201).json(paciente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/pacientes/:id', async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
        res.json(paciente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/pacientes/:id', async (req, res) => {
    try {
        await Paciente.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
