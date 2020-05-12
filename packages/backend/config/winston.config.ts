import * as winston from 'winston';

export const winstonOptions = {
  file: {
    level: 'info',
    filename: './logs/combined.log',
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
    tailable: true,
    format: winston.format.combine(winston.format.uncolorize(), winston.format.json()),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  },
};
