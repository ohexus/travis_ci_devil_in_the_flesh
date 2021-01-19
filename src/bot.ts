import config from 'config';
import { session, Telegraf } from 'telegraf';

import {
  commandParserMiddleware,
  initSessionMiddleware,
  logMessageMiddleware,
  responseTimeMiddleware,
} from './middlewares/bot';

import { commandRouter, messageRouter } from './routes/bot/';

import { commandRegex } from './regexes';

import BotContext from './interfaces/BotContext';

// Initialize bot
const bot = new Telegraf<BotContext>(process.env.TELEGRAM_BOT_TOKEN || config.get('TELEGRAM_BOT_TOKEN'));

// Use session
bot.use(session());
bot.use(initSessionMiddleware);

// Log message
bot.use(logMessageMiddleware);

// Log response time
bot.use(responseTimeMiddleware);

// Parse command
bot.use(commandParserMiddleware);

// Hear command
bot.hears(commandRegex, commandRouter);

// Hear message
bot.on('text', messageRouter);

export default bot;
