import { helpMarkdown, startMarkdown, unsupportedCommandMarkdown } from '../markups/commandResponses';
import {
  linkFormatMarkdown,
  linkSuccessMarkdown,
  linkErrorMarkdown,
  linkWrongMarkdown,
  linkRequiredMarkdown,
} from '../markups/commandResponses/links';
import { noReposMarkdown, repoRequiredMarkdown } from '../markups/commandResponses/repos';
import { deleteErrorMarkdown, deleteSuccessMarkdown } from '../markups/commandResponses/delete';

import { urlRegexp } from '../regexps';

import { RepoLinkService, UserService } from '../services';

import Steps from '../enums/Steps';

import BotContext from '../interfaces/BotContext';
import splitString from '../utils/helpers/splitString';

class CommandController {
  constructor() {}

  async onStart(ctx: BotContext) {
    if (!!ctx.message) {
      const telegramId = ctx.message.from.id;
      const chatId = ctx.message.chat.id;

      const user = await UserService.getUserByTelegramId(telegramId);
      if (!user) {
        await UserService.addUser({ telegramId, chatId });
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
      const [name, url] = splitString(ctx.message.text);

      if (!name || !name.length) {
        return ctx.replyWithMarkdownV2(repoRequiredMarkdown);
      }

      if (!!url && !!url.length) {
        if (urlRegexp.test(url)) {
          const user = await UserService.getUserByTelegramId(ctx.message.from.id);

          if (!!user && !!ctx.session) {
            const repoLink = await RepoLinkService.addLink({ owner: user.id, name, url });
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
      const list = await RepoLinkService.getList(ctx.message.from.id, true);

      if (!!list.length) {
        ctx.reply(`Your repositories:\n${list}`, { disable_web_page_preview: true });
      } else {
        ctx.replyWithMarkdownV2(noReposMarkdown);
      }
    }
  }

  async onDelete(ctx: BotContext) {
    if (!!ctx.message) {
      ctx.session = { step: Steps.DELETE };

      const list = await RepoLinkService.getList(ctx.message.from.id, false);

      if (!!list.length) {
        ctx.reply(`Please type one of your repositories provided below:\n${list}`, { disable_web_page_preview: true });
      } else {
        ctx.replyWithMarkdownV2(noReposMarkdown);
      }
    }
  }

  async onDeleteReply(ctx: BotContext) {
    if (!!ctx.message && !!ctx.message.text) {
      const [name] = splitString(ctx.message.text);

      if (!!name && !!name.length) {
        const user = await UserService.getUserByTelegramId(ctx.message.from.id);

        if (!!user && !!ctx.session) {
          const repoLink = await RepoLinkService.getLinkByName(name, user.id);

          await RepoLinkService.deleteLink(repoLink.id);
          await UserService.deleteLink(user.id, repoLink.id);

          ctx.session.step = null;

          ctx.replyWithMarkdownV2(deleteSuccessMarkdown);

          await this.onList(ctx);
        } else {
          ctx.replyWithMarkdownV2(deleteErrorMarkdown);
        }
      } else {
        ctx.replyWithMarkdownV2(repoRequiredMarkdown);
      }
    }
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
