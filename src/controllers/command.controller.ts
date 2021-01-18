import { LOGS } from '../constants';

import {
  cancelNothingMarkdown,
  cancelSuccessMarkdown,
  deleteErrorMarkdown,
  deleteNothingMarkdown,
  deleteSuccessMarkdown,
  helpMarkdown,
  noReposMarkdown,
  ownerRequiredMarkdown,
  repoErrorMarkdown,
  repoFormatMarkdown,
  repoNotExistsMarkdown,
  repoRequiredMarkdown,
  repoSavedMarkdown,
  startMarkdown,
  titleRequiredMarkdown,
  unsupportedCommandMarkdown,
} from '../markups/commandResponses';

import splitString from '../utils/helpers/splitString';
import getRepo from '../utils/http/requests/getRepo';
import logger from '../utils/logger';

import { RepoService, ChatService } from '../services';

import Steps from '../enums/Steps';

import BotContext from '../interfaces/BotContext';
import listHTML from '../markups/commandResponses/listHTML';

class CommandController {
  constructor() {}

  async onStart(ctx: BotContext) {
    try {
      if (!!ctx.message) {
        const telegramId = ctx.message.chat.id;

        const chat = await ChatService.getChatByTelegramId(telegramId);
        if (!chat) {
          await ChatService.addChat({ telegramId });
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

        const chat = await ChatService.getChatByTelegramId(ctx.message.from.id);

        const githubRepo = await getRepo(owner, repoName);

        if (!githubRepo) {
          return ctx.replyWithMarkdownV2(repoNotExistsMarkdown);
        }

        if (!!chat && !!ctx.session) {
          const repoDoc = await RepoService.addRepo({ owner: chat.id, title, repo: githubRepo });
          await ChatService.addRepo(chat.id, repoDoc.id);

          ctx.session.step = null;

          ctx.replyWithMarkdownV2(repoSavedMarkdown);
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
        const repoDocs = await RepoService.getAllReposByChat(ctx.message.from.id);

        if (!!repoDocs.length) {
          ctx.replyWithHTML(listHTML(repoDocs, true, 'Your repositories'), { disable_web_page_preview: true });
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

        const repoDocs = await RepoService.getAllReposByChat(ctx.message.from.id);

        if (!!repoDocs.length) {
          ctx.replyWithHTML(
            listHTML(
              repoDocs,
              false,
              'Please type one of your repositories provided below',
              'You can cancel this command by typing /cancel.',
            ),
            {
              disable_web_page_preview: true,
            },
          );
        } else {
          ctx.replyWithMarkdownV2(deleteNothingMarkdown);
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async onDeleteReply(ctx: BotContext) {
    try {
      if (!!ctx.message && !!ctx.message.text) {
        const [title] = splitString(ctx.message.text);

        if (!!title && !!title.length) {
          const chat = await ChatService.getChatByTelegramId(ctx.message.from.id);

          if (!!chat && !!ctx.session) {
            const repo = await RepoService.getRepoByTitle(title, chat.id);

            if (!!repo) {
              await RepoService.deleteRepo(repo.id);
              await ChatService.deleteRepo(chat.id, repo.id);

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
      if (!!ctx.session && !!ctx.session.step) {
        ctx.session.step = null;

        ctx.replyWithMarkdownV2(cancelSuccessMarkdown);
      } else {
        ctx.replyWithMarkdownV2(cancelNothingMarkdown);
      }
    } catch (err) {
      logger.error(err);
    }
  }
}

export default new CommandController();
