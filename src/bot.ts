import config from 'config';
import { session, Telegraf } from 'telegraf';

import logMessageMiddleware from './middlewares/logMessage.middleware';
import responseTimeMiddleware from './middlewares/responseTime.middleware';

import commandRouter from './routes/bot/command.routes';
import messageRouter from './routes/bot/message.routes';

import { commandRegexp } from './regexps';

import BotContext from './interfaces/BotContext';

// Initialize bot
const bot = new Telegraf<BotContext>(process.env.TELEGRAM_BOT_TOKEN || config.get('TELEGRAM_BOT_TOKEN'));

// Use session
bot.use(session());

// Log message
bot.use(logMessageMiddleware);

// Log response time
bot.use(responseTimeMiddleware);

// Hear command
bot.hears(commandRegexp, commandRouter);

// Hear message
bot.on('text', messageRouter);

export default bot;
