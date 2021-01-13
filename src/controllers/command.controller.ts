import { Context } from 'telegraf';
import { helpMarkdown, startMarkdown } from '../markdowns';

class CommandController {
  constructor() {}

  markdownReply(ctx: Context, markdown: string) {
    ctx.reply(markdown, { parse_mode: 'MarkdownV2' });
  }

  onStart(ctx: Context) {
    this.markdownReply(ctx, startMarkdown);
  }

  onHelp(ctx: Context) {
    this.markdownReply(ctx, helpMarkdown);
  }
}

export default new CommandController();
