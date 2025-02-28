const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',  // Nivel mínimo de log que se mostrará
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),  // Muestra logs en la consola
        new transports.File({ filename: 'logs/app.log' })  // Guarda logs en un archivo
    ],
});

module.exports = logger;
