import { Context } from 'telegraf';
import { helpMarkdown, startMarkdown } from '../markdowns';

class CommandController {
  constructor() {}

  onStart(ctx: Context) {
    ctx.replyWithMarkdownV2(startMarkdown);
  }

  onHelp(ctx: Context) {
    ctx.replyWithMarkdownV2(helpMarkdown);
  }
}

export default new CommandController();
