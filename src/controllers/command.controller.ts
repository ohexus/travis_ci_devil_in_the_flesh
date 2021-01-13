import { Context } from 'telegraf';
import { helpMarkdown, startMarkdown, unsupportedCommandMarkdown } from '../markups';

class CommandController {
  constructor() {}

  onStart(ctx: Context) {
    ctx.replyWithMarkdownV2(startMarkdown);
  }

  onHelp(ctx: Context) {
    ctx.replyWithMarkdownV2(helpMarkdown);
  }

  onUnsupported(ctx: Context) {
    ctx.replyWithMarkdownV2(unsupportedCommandMarkdown);
  }
}

export default new CommandController();
