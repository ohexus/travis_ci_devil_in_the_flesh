import { Context } from 'telegraf';

import bot from './src/bot';
import CommandController from './src/controllers/command.controller';
import { startMarkdown, helpMarkdown } from './src/markdowns';

// bot.start((ctx: Context) => ctx.reply(startMarkdown, { parse_mode: 'MarkdownV2' }));
// bot.help((ctx: Context) => ctx.reply(helpMarkdown, { parse_mode: 'MarkdownV2' }));

bot.start((ctx: Context) => CommandController.onStart(ctx));
bot.help((ctx: Context) => CommandController.onHelp(ctx));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
