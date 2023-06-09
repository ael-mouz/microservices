const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

// const loggerMiddleware = (err, req, res, next) => {
//     logger.error(err.stack);
//     logger.info(`${req.method} ${req.url}`);
//     next();
// };

module.exports = {logger};