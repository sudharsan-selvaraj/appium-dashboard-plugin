import { config } from "../config";
const winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf(({ level, message, timestamp, label }: any) => {
      return `${level.toUpperCase()} : ${timestamp}  ${message} `;
    })
  ),
  transports: [new winston.transports.File({ filename: config.logFilePath })],
});

export { logger };
