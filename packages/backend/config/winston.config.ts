import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const winstonOptions = {
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  },
  dailyRotateFile: {
    level: 'info',
    filename: './logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    createSymlink: true,
    format: winston.format.combine(
      winston.format.uncolorize(),
      winston.format.timestamp(),
      winston.format.metadata({ fillExcept: ['timestamp', 'level', 'message'] }),
      winston.format.json(),
    ),
  },
};
