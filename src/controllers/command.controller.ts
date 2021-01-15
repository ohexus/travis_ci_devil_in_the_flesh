import { LOGS } from '../constants';

import { helpMarkdown, startMarkdown, unsupportedCommandMarkdown } from '../markups/commandResponses';

import {
  noReposMarkdown,
  ownerRequiredMarkdown,
  repoErrorMarkdown,
  repoFormatMarkdown,
  repoRequiredMarkdown,
  repoSuccessMarkdown,
  titleRequiredMarkdown,
} from '../markups/commandResponses/repos';
import { deleteErrorMarkdown, deleteSuccessMarkdown } from '../markups/commandResponses/delete';

import splitString from '../utils/helpers/splitString';
import logger from '../utils/logger';

import { RepoService, UserService } from '../services';

import Steps from '../enums/Steps';

import BotContext from '../interfaces/BotContext';
import getRepo from '../utils/http/requests/getRepo';

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

      ctx.replyWithMarkdownV2(repoFormatMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }

  async onLinkReply(ctx: BotContext) {
    try {
      if (!!ctx.message && !!ctx.message.text) {
        const [title, owner, repoName] = splitString(ctx.message.text);

        if (!title || !title.length) {
          return ctx.replyWithMarkdownV2(titleRequiredMarkdown);
        }

        if (!owner || !owner.length) {
          return ctx.replyWithMarkdownV2(ownerRequiredMarkdown);
        }

        if (!repoName || !repoName.length) {
          return ctx.replyWithMarkdownV2(repoRequiredMarkdown);
        }

        const user = await UserService.getUserByTelegramId(ctx.message.from.id);

        const githubRepo = await getRepo(owner, repoName);

        if (!!user && !!githubRepo && !!ctx.session) {
          const repoDoc = await RepoService.addRepo({ owner: user.id, name: title, repo: githubRepo });
          await UserService.addRepo(user.id, repoDoc.id);

          ctx.session.step = null;

          ctx.replyWithMarkdownV2(repoSuccessMarkdown);
        } else {
          ctx.replyWithMarkdownV2(repoErrorMarkdown);
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async onList(ctx: BotContext) {
    try {
      if (!!ctx.message) {
        const list = await RepoService.getList(ctx.message.from.id, true);

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

        const list = await RepoService.getList(ctx.message.from.id, false);

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
            const repo = await RepoService.getRepoByName(name, user.id);

            if (!!repo) {
              await RepoService.deleteRepo(repo.id);
              await UserService.deleteRepo(user.id, repo.id);

              ctx.session.step = null;

              ctx.replyWithMarkdownV2(deleteSuccessMarkdown);

              await this.onList(ctx);
            } else {
              throw new Error(LOGS.ERROR.REPO.NOT_FOUND);
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
