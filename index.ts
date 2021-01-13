import { Context } from 'telegraf';

import bot from './src/bot';

import CommandController from './src/controllers/command.controller';

import responseTimeMiddleware from './src/middlewares/responseTime.middleware';

// bot.start((ctx: Context) => ctx.reply(startMarkdown, { parse_mode: 'MarkdownV2' }));
// bot.help((ctx: Context) => ctx.reply(helpMarkdown, { parse_mode: 'MarkdownV2' }));

bot.use(responseTimeMiddleware);

bot.start((ctx: Context) => CommandController.onStart(ctx));
bot.help((ctx: Context) => CommandController.onHelp(ctx));

// Start bot
bot.launch().then(() => console.log('bot started successfully.'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
