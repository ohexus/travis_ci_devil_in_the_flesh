import { LOGS } from '../constants';

import {
  cancelNothingMarkdown,
  cancelSuccessMarkdown,
  deleteErrorMarkdown,
  deleteNothingMarkdown,
  deleteSuccessMarkdown,
  helpMarkdown,
  listHTML,
  noReposMarkdown,
  ownerRequiredMarkdown,
  repoErrorMarkdown,
  repoFormatMarkdown,
  repoNotExistsMarkdown,
  repoNotFoundMarkdown,
  repoRequiredMarkdown,
  repoSavedMarkdown,
  repoTrackedMarkdown,
  secretChangeMarkdown,
  secretErrorMarkdown,
  secretFormatHTML,
  secretRequiredMarkdown,
  secretSavedHTML,
  startMarkdown,
  titleAlreadyUsedMarkdown,
  titleChangeErrorMarkdown,
  titleChangeFormatMarkdown,
  titleChangeSuccessMarkdown,
  titleRequiredMarkdown,
  unsupportedCommandMarkdown,
} from '../markups/commandResponses';

import splitString from '../utils/helpers/splitString';
import getRepoFromGithub from '../utils/http/requests/getRepoFromGithub';
import logger from '../utils/logger';

import { RepoService, ChatService } from '../services';

import Commands from '../enums/Commands';
import Steps from '../enums/Steps';

import BotContext from '../interfaces/BotContext';
import { RepoDoc } from '../interfaces/entities/Repo';

class CommandController {
  constructor() {}

  async onStart(ctx: BotContext): Promise<void> {
    try {
      const telegramId = ctx.message.chat.id;

      const chatDoc = await ChatService.getChatByTelegramId(telegramId);
      if (!chatDoc) {
        await ChatService.addChat({ telegramId });
      }

      await ctx.replyWithMarkdownV2(startMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }

  async onHelp(ctx: BotContext): Promise<void> {
    try {
      await ctx.replyWithMarkdownV2(helpMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }

  async onLink(ctx: BotContext): Promise<void> {
    try {
      this.setStep(ctx, Steps.LINK);

      await ctx.replyWithMarkdownV2(repoFormatMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }

  checkLinkReply(ctx: BotContext, title?: string, owner?: string, repoName?: string): boolean {
    if (!title || !title.length) {
      ctx.replyWithMarkdownV2(titleRequiredMarkdown);
      return false;
    } else if (!owner || !owner.length) {
      ctx.replyWithMarkdownV2(ownerRequiredMarkdown);
      return false;
    } else if (!repoName || !repoName.length) {
      ctx.replyWithMarkdownV2(repoRequiredMarkdown);
      return false;
    }

    return true;
  }

  checkIsRepoTitleUsed(ctx: BotContext, repoDocs: RepoDoc[], title: string): boolean {
    if (!!repoDocs.find((doc) => doc.title === title)) {
      ctx.replyWithMarkdownV2(titleAlreadyUsedMarkdown);
      return true;
    }
    return false;
  }

  checkIsRepoTracked(ctx: BotContext, repoDocs: RepoDoc[], owner: string, repoName: string): boolean {
    if (!!repoDocs.find((doc) => doc.repo.owner_name === owner && doc.repo.name === repoName)) {
      ctx.replyWithMarkdownV2(repoTrackedMarkdown);
      return true;
    }
    return false;
  }

  async onLinkReply(ctx: BotContext): Promise<void> {
    try {
      const [title, owner, repoName] = splitString(ctx.message.text);
      if (!this.checkLinkReply(ctx, title, owner, repoName)) return;

      const chatDoc = await ChatService.getChatByTelegramId(ctx.message.chat.id);

      const githubRepo = await getRepoFromGithub(owner, repoName);
      if (!githubRepo) {
        await ctx.replyWithMarkdownV2(repoNotExistsMarkdown);
        return;
      }

      if (!!chatDoc) {
        const repoDocs = await RepoService.getAllReposByChat(ctx.message.chat.id);

        if (this.checkIsRepoTitleUsed(ctx, repoDocs, title)) return;
        if (this.checkIsRepoTracked(ctx, repoDocs, owner, repoName)) return;

        const repoDoc = await RepoService.addRepo({ owner: chatDoc.id, title, repo: githubRepo });
        await ChatService.addRepo(chatDoc.id, repoDoc.id);

        await ctx.replyWithMarkdownV2(repoSavedMarkdown);

        this.setStep(ctx, Steps.SECRET, repoDoc.id);

        await ctx.replyWithHTML(secretFormatHTML());
      } else {
        await ctx.replyWithMarkdownV2(repoErrorMarkdown);
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async onSecretChange(ctx: BotContext): Promise<void> {
    try {
      this.setStep(ctx, Steps.CHANGE_SECRET);

      const repoDocs = await RepoService.getAllReposByChat(ctx.message.chat.id);

      if (!!repoDocs.length) {
        await ctx.replyWithHTML(listHTML(repoDocs, false), { disable_web_page_preview: true });

        await ctx.replyWithMarkdownV2(secretChangeMarkdown);
      } else {
        await ctx.replyWithMarkdownV2(noReposMarkdown);
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async onSecretChangeReply(ctx: BotContext): Promise<void> {
    try {
      const chatDoc = await ChatService.getChatByTelegramId(ctx.message.chat.id);

      if (!!chatDoc) {
        const [repoTitle] = splitString(ctx.message.text);

        if (!repoTitle) {
          await ctx.replyWithMarkdownV2(titleRequiredMarkdown);
          return;
        }

        const repoDoc = await RepoService.getRepoByTitle(chatDoc.id, repoTitle);

        if (!!repoDoc) {
          this.setStep(ctx, Steps.SECRET, repoDoc.id);

          await ctx.replyWithHTML(secretFormatHTML(false));
        } else {
          await ctx.replyWithMarkdownV2(repoNotFoundMarkdown);
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async onSecretReply(ctx: BotContext): Promise<void> {
    try {
      const [secret] = splitString(ctx.message.text);

      if (!secret || !secret.length) {
        await ctx.replyWithMarkdownV2(secretRequiredMarkdown);
        return;
      }

      const repoDoc = await RepoService.setSecret(ctx.session.repoIdForSecret, secret);

      if (!!repoDoc) {
        await ctx.replyWithHTML(secretSavedHTML(secret));
      } else {
        await RepoService.deleteRepo(ctx.session.repoIdForSecret);

        await ctx.replyWithMarkdownV2(secretErrorMarkdown);
      }

      this.clearStep(ctx);
    } catch (err) {
      logger.error(err);
    }
  }

  async onTitleChange(ctx: BotContext): Promise<void> {
    try {
      this.setStep(ctx, Steps.CHANGE_TITLE);

      await ctx.replyWithMarkdownV2(titleChangeFormatMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }

  async onTitleChangeReply(ctx: BotContext): Promise<void> {
    try {
      const [prevTitle, nextTitle] = splitString(ctx.message.text);

      if (!prevTitle || !prevTitle.length || !nextTitle || !nextTitle.length) {
        ctx.replyWithMarkdownV2(titleRequiredMarkdown);
        return;
      }

      const chatDoc = await ChatService.getChatByTelegramId(ctx.message.chat.id);
      if (!chatDoc) {
        throw new Error(LOGS.ERROR.TITLE.CHANGE);
      }

      const repoDoc = await RepoService.getRepoByTitle(chatDoc.id, prevTitle);
      if (!repoDoc) {
        throw new Error(LOGS.ERROR.TITLE.CHANGE);
      }

      const updatedRepoDoc = await RepoService.changeTitle(repoDoc.id, nextTitle);
      if (!updatedRepoDoc) {
        throw new Error(LOGS.ERROR.TITLE.CHANGE);
      }

      await ctx.replyWithMarkdownV2(titleChangeSuccessMarkdown);
    } catch (err) {
      logger.error(err);

      await ctx.replyWithMarkdownV2(titleChangeErrorMarkdown);
    }
  }

  async onList(ctx: BotContext): Promise<void> {
    try {
      const repoDocs = await RepoService.getAllReposByChat(ctx.message.chat.id);

      if (!!repoDocs.length) {
        await ctx.replyWithHTML(listHTML(repoDocs, true, 'Your repositories'), { disable_web_page_preview: true });
      } else {
        await ctx.replyWithMarkdownV2(noReposMarkdown);
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async onDelete(ctx: BotContext): Promise<void> {
    try {
      this.setStep(ctx, Steps.DELETE);

      const repoDocs = await RepoService.getAllReposByChat(ctx.message.chat.id);

      if (!!repoDocs.length) {
        await ctx.replyWithHTML(
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
        await ctx.replyWithMarkdownV2(deleteNothingMarkdown);
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async onDeleteReply(ctx: BotContext): Promise<void> {
    try {
      const [title] = splitString(ctx.message.text);

      if (!!title && !!title.length) {
        const chatDoc = await ChatService.getChatByTelegramId(ctx.message.chat.id);

        if (!!chatDoc) {
          const repoDoc = await RepoService.getRepoByTitle(chatDoc.id, title);

          if (!!repoDoc) {
            await RepoService.deleteRepo(repoDoc.id);
            await ChatService.deleteRepo(chatDoc.id, repoDoc.id);

            await ctx.replyWithMarkdownV2(deleteSuccessMarkdown);

            await this.onList(ctx);

            this.clearStep(ctx);
          } else {
            throw new Error(LOGS.ERROR.REPO.DELETE);
          }
        } else {
          throw new Error(LOGS.ERROR.CHAT.NOT_FOUND);
        }
      } else {
        await ctx.replyWithMarkdownV2(repoRequiredMarkdown);
      }
    } catch (err) {
      logger.error(err);

      await ctx.replyWithMarkdownV2(deleteErrorMarkdown);
    }
  }

  async onUnsupported(ctx: BotContext): Promise<void> {
    try {
      await ctx.replyWithMarkdownV2(unsupportedCommandMarkdown);
    } catch (err) {
      logger.error(err);
    }
  }

  async onCancel(ctx: BotContext): Promise<void> {
    try {
      if (!!ctx.session.repoIdForSecret && ctx.session.command.prev !== Commands.CHANGE_SECRET) {
        const chatDoc = await ChatService.getChatByTelegramId(ctx.message.chat.id);

        if (!!chatDoc) {
          await RepoService.deleteRepo(ctx.session.repoIdForSecret);
          await ChatService.deleteRepo(chatDoc.id, ctx.session.repoIdForSecret);
        }
      }

      if (!!ctx.session.step) {
        await ctx.replyWithMarkdownV2(cancelSuccessMarkdown);
      } else {
        await ctx.replyWithMarkdownV2(cancelNothingMarkdown);
      }

      this.clearStep(ctx);
    } catch (err) {
      logger.error(err);
    }
  }

  setStep(ctx: BotContext, step: Steps | null, repoIdForSecret: RepoDoc['id'] | null = null): void {
    ctx.session.step = step;
    ctx.session.repoIdForSecret = repoIdForSecret;
  }

  clearStep(ctx: BotContext): void {
    this.setStep(ctx, null, null);
  }
}

export default new CommandController();
