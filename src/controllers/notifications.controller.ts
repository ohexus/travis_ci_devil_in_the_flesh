import { Request, Response } from 'express';

import bot from '../bot';

import { LOGS } from '../constants';

import errorHandler from '../utils/http/errorHandler';
import successResponse from '../utils/http/successResponse';
import logger from '../utils/logger';

import { RepoService, ChatService, SecretService } from '../services';

import buildStatusHTML from '../markups/buildStatusHTML';

import TravisPayload from '../interfaces/TravisPayload';

class NotificationsController {
  constructor() {}

  async postNotify(req: Request, res: Response): Promise<Response> {
    try {
      const payload: TravisPayload | null = !!req.body.payload ? (JSON.parse(req.body.payload) as TravisPayload) : null;
      if (!payload || !payload.repository) {
        throw new Error(LOGS.ERROR.TRAVIS.WRONG_PAYLOAD);
      }

      const { repository } = payload;

      let secret = req.query.secret as string;
      if (!secret) {
        const foundSecret = SecretService.getSecret(repository.owner_name, repository.name);

        if (!foundSecret) {
          throw new Error(LOGS.ERROR.SECRET.NOT_PROVIDED);
        }

        secret = foundSecret.value;

        SecretService.deleteSecret(repository.owner_name, repository.name);
      }

      const repos = await RepoService.getRepos(repository.owner_name, repository.name, secret);
      if (!repos.length) {
        throw new Error(LOGS.ERROR.REPO.NOT_FOUND);
      }

      try {
        for (let i = 0; i < repos.length; i++) {
          const chat = await ChatService.getChatById(repos[i].owner);

          await bot.telegram.sendMessage(chat.telegramId, buildStatusHTML(payload), { parse_mode: 'HTML' });
        }

        return successResponse(res, LOGS.SUCCESS.NOTIFICATION.SEND);
      } catch (err) {
        throw new Error(LOGS.ERROR.NOTIFICATION.SEND);
      }
    } catch (err) {
      logger.error(err);

      return errorHandler(res, err);
    }
  }
}

export default new NotificationsController();
