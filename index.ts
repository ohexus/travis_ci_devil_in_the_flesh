import express, { Application } from 'express';
import cors from 'cors';
import config from 'config';

import appRouter from './src/routes/app.routes';

import bot from './src/bot';

const app: Application = express();

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
