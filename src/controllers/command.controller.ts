import { LOGS } from '../constants';

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

import splitString from '../utils/helpers/splitString';
import logger from '../utils/logger';

import { RepoLinkService, UserService } from '../services';

import Steps from '../enums/Steps';

import BotContext from '../interfaces/BotContext';

class CommandController {
  constructor() {}

  async onStart(ctx: BotContext) {
    try {
      if (!!ctx.message) {
        const telegramId = ctx.message.from.id;
        const chatId = ctx.message.chat.id;

        const user = await UserService.getUserByTelegramId(telegramId);
        if (!user) {
          await UserService.addUser({ telegramId, chatId });
        }
      }

      ctx.replyWithMarkdownV2(startMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }

  async onHelp(ctx: BotContext) {
    try {
      ctx.replyWithMarkdownV2(helpMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }

  async onLink(ctx: BotContext) {
    try {
      ctx.session = { step: Steps.LINK };

      ctx.replyWithMarkdownV2(linkFormatMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }

  async onLinkReply(ctx: BotContext) {
    try {
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
    } catch (err) {
      logger.error(err);
    }
  }

  async onList(ctx: BotContext) {
    try {
      if (!!ctx.message) {
        const list = await RepoLinkService.getList(ctx.message.from.id, true);

        if (!!list.length) {
          ctx.reply(`Your repositories:\n${list}`, { disable_web_page_preview: true });
        } else {
          ctx.replyWithMarkdownV2(noReposMarkdown);
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async onDelete(ctx: BotContext) {
    try {
      if (!!ctx.message) {
        ctx.session = { step: Steps.DELETE };

        const list = await RepoLinkService.getList(ctx.message.from.id, false);

        if (!!list.length) {
          ctx.reply(`Please type one of your repositories provided below:\n${list}`, {
            disable_web_page_preview: true,
          });
        } else {
          ctx.replyWithMarkdownV2(noReposMarkdown);
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async onDeleteReply(ctx: BotContext) {
    try {
      if (!!ctx.message && !!ctx.message.text) {
        const [name] = splitString(ctx.message.text);

        if (!!name && !!name.length) {
          const user = await UserService.getUserByTelegramId(ctx.message.from.id);

          if (!!user && !!ctx.session) {
            const repoLink = await RepoLinkService.getLinkByName(name, user.id);

            if (!!repoLink) {
              await RepoLinkService.deleteLink(repoLink.id);
              await UserService.deleteLink(user.id, repoLink.id);

              ctx.session.step = null;

              ctx.replyWithMarkdownV2(deleteSuccessMarkdown);

              await this.onList(ctx);
            } else {
              throw new Error(LOGS.ERROR.LINK.NOT_FOUND);
            }
          } else {
            ctx.replyWithMarkdownV2(deleteErrorMarkdown);
          }
        } else {
          ctx.replyWithMarkdownV2(repoRequiredMarkdown);
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async onUnsupported(ctx: BotContext) {
    try {
      ctx.replyWithMarkdownV2(unsupportedCommandMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }

  async onCancel(ctx: BotContext) {
    try {
      if (!!ctx.session) {
        ctx.session.step = null;
      }

      ctx.replyWithMarkdownV2(helpMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }
}

export default new CommandController();
