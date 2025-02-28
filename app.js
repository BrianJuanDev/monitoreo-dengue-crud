// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

//Importaciones de Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importar rutas
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Pacientes con Dengue",
            version: "1.0.0",
            description: "Documentación de la API para gestionar pacientes",
        },
        servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["./routes/*.js"], // Archivos donde están definidas las rutas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use(cors());

// Configurar motor de vistas como EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Carpeta para las vistas

// Middleware para servir archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

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
