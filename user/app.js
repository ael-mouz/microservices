require("dotenv").config();
const db = require("./config/database");
const express = require("express");
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;
const { API_PORT, PORT } = process.env;
const port = PORT || API_PORT;
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/authRoutes");

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
db.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(cookieParser());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
app.use("/", authRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(port, () => {
  logger.info(`server started on port ${port}`);
});

