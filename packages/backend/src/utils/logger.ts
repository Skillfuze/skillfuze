import * as winston from 'winston';
import logdnaWinston from 'logdna-winston';
import config from '../../config';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile(config.winston.dailyRotateFile),
    new winston.transports.Console(config.winston.console),
    new logdnaWinston(config.winston.logdna),
  ],
  exitOnError: false,
});

export const stream = {
  write: (message) => {
    logger.info(message);
  },
};
