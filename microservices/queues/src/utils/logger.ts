import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import { createLogger, transports, type Logger, format } from 'winston';

const logsFolderPath = join(process.cwd(), 'logs');
if (!existsSync(logsFolderPath)) {
  mkdirSync(logsFolderPath);
}

const getDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const logFilePath = join(logsFolderPath, `${getDate()}_combined.log`);

export const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      const logLevel = level != null ? level.toUpperCase() : 'INFO';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const logMessage = message ?? 'No message provided';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const logTimestamp = timestamp ?? new Date().toISOString();
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${logTimestamp} - ${logLevel} - ${logMessage}`;
    }),
  ),
  transports: [new transports.Console(), new transports.File({ filename: logFilePath })],
});
