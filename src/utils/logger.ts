import config from 'config';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LVL || config.get('LOGGER_LVL') || 'INFO';

export default logger;
