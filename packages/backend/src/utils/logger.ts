import winston from 'winston';
import LogdnaWinston from 'logdna-winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import config from '../../config';

export const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(config.winston.dailyRotateFile),
    new winston.transports.Console(config.winston.console),
    new LogdnaWinston(config.winston.logdna),
  ],
  exitOnError: false,
});

export const stream = {
  write: (message) => {
    logger.info(message, { label: 'api' });
  },
};
