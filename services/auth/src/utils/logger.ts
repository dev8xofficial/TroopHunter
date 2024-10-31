import { format } from 'winston';
import { createLogger, transports, Logger } from 'winston';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Create the logs folder if it doesn't exist
const logsFolderPath = join(process.cwd(), 'logs');
if (!existsSync(logsFolderPath)) {
  mkdirSync(logsFolderPath);
}

// Function to get the current date in the format: YYYY-MM-DD
function getDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Get the log file path for the current date
const logFilePath = join(logsFolderPath, `${getDate()}_combined.log`);

// Create a new Winston Logger instance
const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => `${timestamp} - ${level.toUpperCase()} - ${message}`)
  ),
  transports: [new transports.Console(), new transports.File({ filename: logFilePath })],
});

export default logger;
