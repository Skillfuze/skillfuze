import * as winston from 'winston';
import config from '../../config';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File(config.winston.file),
    new winston.transports.Console(config.winston.console),
  ],
  exitOnError: false,
});

export const stream = {
  write: message => {
    logger.info(message);
  },
};
