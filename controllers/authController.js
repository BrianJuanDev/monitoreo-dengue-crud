const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // Cambia esto en producción

// Registrar usuario
async function register(req, res) {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) 
      return res.status(400).json({ error: 'El usuario ya existe.' });

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el usuario.', details: err.message });
  }
};

// Iniciar sesión
async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) 
			return res.status(400).json({ error: 'Usuario no encontrado.' });

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) 
			return res.status(400).json({ error: 'Contraseña incorrecta.' });

    // Generar token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.header('Authorization', token).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión.', details: err.message });
  }
};

module.exports = {
	register,
	login
};