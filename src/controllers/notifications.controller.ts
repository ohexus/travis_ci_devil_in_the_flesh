import { Request, Response } from 'express';

import bot from '../bot';

import { LOGS } from '../constants';

import logger from '../utils/logger';

import { RepoService, UserService } from '../services';

import buildStatusHTML from '../markups/buildStatusHTML';

import TravisPayload from '../interfaces/TravisPayload';

class NotificationsController {
  constructor() {}

  // TODO
  async postNotify(req: Request, res: Response): Promise<void> {
    try {
      const payload: TravisPayload = JSON.parse(req.body.payload);

      if (!payload || !payload.repository) {
        throw new Error(LOGS.ERROR.TRAVIS.WRONG_PAYLOAD);
      }

      const repo = await RepoService.getRepoById(payload.repository.id);

      console.log(repo);

      if (!!repo) {
        const user = await UserService.getUserById(repo.owner);

        const buildHTML = buildStatusHTML(payload);

        bot.telegram.sendMessage(user.chatId, buildHTML, { parse_mode: 'HTML' });
      }
    } catch (err) {
      logger.error(err);
    }
  }
}

export default new NotificationsController();
