import mongoose from 'mongoose';
import config from 'config';

import { isProduction, LOGS } from '../../constants';

import log4js from 'log4js';
const logger = log4js.getLogger();

const MONGO_URI: string = process.env.MONGO_URI || config.get('MONGO_URI');

if (!isProduction) {
  mongoose.set('debug', true);
}

export default async function connectDB(): Promise<typeof mongoose | null> {
  try {
    const connection: typeof mongoose = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });

    logger.info(LOGS.SUCCESS.DB.CONNECTION);

    return connection;
  } catch (error) {
    logger.error(error.message);

    return null;
  }
}
