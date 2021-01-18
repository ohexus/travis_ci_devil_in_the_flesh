import { Request, Response } from 'express';

import bot from '../bot';

import { LOGS } from '../constants';

import errorHandler from '../utils/http/errorHandler';
import successResponse from '../utils/http/successResponse';
import logger from '../utils/logger';

import { RepoService, ChatService } from '../services';

import buildStatusHTML from '../markups/buildStatusHTML';

import TravisPayload from '../interfaces/TravisPayload';

class NotificationsController {
  constructor() {}

  async postNotify(req: Request, res: Response): Promise<Response> {
    try {
      const payload: TravisPayload = JSON.parse(req.body.payload);
      if (!payload || !payload.repository) {
        throw new Error(LOGS.ERROR.TRAVIS.WRONG_PAYLOAD);
      }

      const { repository } = payload;

      const repo = await RepoService.getRepo(repository.owner_name, repository.name);
      if (!repo) {
        throw new Error(LOGS.ERROR.REPO.NOT_FOUND);
      }

      const chat = await ChatService.getChatById(repo.owner);

      try {
        await bot.telegram.sendMessage(chat.telegramId, buildStatusHTML(payload), { parse_mode: 'HTML' });

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
