// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Importar rutas
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pacientes')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar con MongoDB:', err));

// Rutas
app.use('/api/pacientes', patientRoutes); // Rutas para pacientes
app.use('/api/auth', authRoutes); // Rutas para autenticación

// Ruta inicial
app.get('/', (req, res) => {
    res.send('Bienvenido al sistema para pacientes con dengue');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
