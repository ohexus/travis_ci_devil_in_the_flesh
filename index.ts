import express, { Application } from 'express';
import cors from 'cors';
import config from 'config';

import appRouter from './src/routes/app.routes';

import { connectDB } from './src/utils/db';

import { LOGS } from './src/constants';

import bot from './src/bot';

const app: Application = express();

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

// Start server
const PORT = process.env.PORT || config.get('PORT');
const server = app.listen(PORT, () => {
  console.log('Listening on port %s', PORT);
});

// Enable graceful stop
process.once('SIGINT', () => {
  bot.stop('SIGINT');
  server.close();
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
  server.close();
});
