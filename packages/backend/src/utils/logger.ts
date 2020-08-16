import winston from 'winston';
import LogdnaWinston from 'logdna-winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import config from '../../config';

const transports = [
  new DailyRotateFile(config.winston.dailyRotateFile),
  new winston.transports.Console(config.winston.console),
];

if (process.env.NODE_ENV === 'production') {
  transports.push(new LogdnaWinston(config.winston.logdna));
}

export const logger = winston.createLogger({
  transports,
  exitOnError: false,
});

export const stream = {
  write: (message) => {
    logger.info(message, { label: 'api' });
  },
};
