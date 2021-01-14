import config from 'config';
import { Context, Middleware, Telegraf } from 'telegraf';

import logMessageMiddleware from './middlewares/logMessage.middleware';
import responseTimeMiddleware from './middlewares/responseTime.middleware';

import commandRouter from './routes/command.routes';

// Initialize bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || config.get('TELEGRAM_BOT_TOKEN'));

// Set webhook
bot.telegram.setWebhook(process.env.WEB_HOOK_URI || config.get('WEB_HOOK_URI'));

// Log message
bot.use(logMessageMiddleware as Middleware<Context>);

// Log response time
bot.use(responseTimeMiddleware);

// Hear command
bot.hears(/\/.[^ ]+/g, commandRouter);

export default bot;
