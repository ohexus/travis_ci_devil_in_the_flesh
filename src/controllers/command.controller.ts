import {
  helpMarkdown,
  linkErrorMarkdown,
  linkFormatMarkdown,
  linkRequiredMarkdown,
  linkSuccessMarkdown,
  linkWrongMarkdown,
  startMarkdown,
  unsupportedCommandMarkdown,
} from '../markups/commandResponses';

import { multipleSpaces, urlRegexp } from '../regexps';

import { RepoLinkService, UserService } from '../services';

import Steps from '../enums/Steps';

import BotContext from '../interfaces/BotContext';

class CommandController {
  constructor() {}

  async onStart(ctx: BotContext) {
    if (!!ctx.message) {
      const telegramId = ctx.message.from.id;

      const user = await UserService.getUserByTelegramId(telegramId);
      if (!user) {
        await UserService.addUser({ telegramId });
      }
    }

    ctx.replyWithMarkdownV2(startMarkdown);
  }

  async onHelp(ctx: BotContext) {
    ctx.replyWithMarkdownV2(helpMarkdown);
  }

  async onLink(ctx: BotContext) {
    ctx.session = { step: Steps.LINK };

    ctx.replyWithMarkdownV2(linkFormatMarkdown);
  }

  async onLinkReply(ctx: BotContext) {
    if (!!ctx.message && !!ctx.message.text) {
      const [name, link] = ctx.message.text.replace(multipleSpaces, ' ').trim().split(' ');

      if (!!link && !!link.length) {
        if (urlRegexp.test(link)) {
          const user = await UserService.getUserByTelegramId(ctx.message.from.id);

          if (!!user && !!ctx.session) {
            const repoLink = await RepoLinkService.addLink({ owner: user.id, name, link });
            await UserService.addLink(user.id, repoLink.id);

            ctx.session.step = null;

            ctx.replyWithMarkdownV2(linkSuccessMarkdown);
          } else {
            ctx.replyWithMarkdownV2(linkErrorMarkdown);
          }
        } else {
          ctx.replyWithMarkdownV2(linkWrongMarkdown);
        }
      } else {
        ctx.replyWithMarkdownV2(linkRequiredMarkdown);
      }
    }
  }

  async onList(ctx: BotContext) {
    if (!!ctx.message) {
      const listArray = await RepoLinkService.getAllLinksByUser(ctx.message.from.id);

      const list = listArray
        .map((repo) => `${repo.name}: ${repo.link}`)
        .reduce((acc: string, curr: string) => acc + curr + '\n', '');

      ctx.reply(list);
    }
  }

  async onDelete(ctx: BotContext) {
    ctx.reply('delete');
  }

  async onUnsupported(ctx: BotContext) {
    ctx.replyWithMarkdownV2(unsupportedCommandMarkdown);
  }

  async onCancel(ctx: BotContext) {
    if (!!ctx.session) {
      ctx.session.step = null;
    }

    ctx.replyWithMarkdownV2(helpMarkdown);
  }
}

export default new CommandController();
