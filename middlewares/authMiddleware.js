const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // Cambia esto en producción

function authenticate (req, res, next) {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
  }
  
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Adjunta la información del usuario al objeto de la solicitud
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};

module.exports = authenticate;
