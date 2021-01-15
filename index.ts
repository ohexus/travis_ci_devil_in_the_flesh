import express, { Application } from 'express';
import cors from 'cors';
import config from 'config';
import log4js from 'log4js';

import appRouter from './src/routes/app.routes';

import { connectDB } from './src/utils/db';

import { LOGS } from './src/constants';

import bot from './src/bot';

const app: Application = express();

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LVL || config.get('LOGGER_LVL');

const dbConnection = connectDB();
if (!dbConnection) {
  throw new Error(LOGS.ERROR.DB.CONNECTION);
}

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', appRouter);

// Start bot
bot.launch().then(() => console.log('Bot started successfully.'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Start server
const PORT = process.env.PORT || config.get('PORT');
app.listen(PORT, () => {
  console.log('Listening on port %s', PORT);
});
