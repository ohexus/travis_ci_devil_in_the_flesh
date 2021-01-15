import { Request, Response } from 'express';

import bot from '../bot';

import { LOGS } from '../constants';

import logger from '../utils/logger';

import { UserService } from '../services';
import repoLinkService from '../services/repoLink.service';

import buildStatusHTML from '../markups/buildStatusHTML';

import TravisPayload from '../interfaces/TravisPayload';

class NotificationsController {
  constructor() {}

  // TODO
  async postNotify(req: Request, res: Response): Promise<void> {
    try {
      const { payload }: { payload: TravisPayload } = req.body;

      if (!payload || !payload.repository) {
        throw new Error(LOGS.ERROR.TRAVIS.WRONG_PAYLOAD);
      }

      const repoLink = await repoLinkService.getLinkByUrl(payload.repository.url);

      if (!!repoLink) {
        const user = await UserService.getUserById(repoLink.owner);

        const buildHTML = buildStatusHTML(payload);

        bot.telegram.sendMessage(user.chatId, buildHTML, { parse_mode: 'HTML' });
      }
    } catch (err) {
      logger.error(err);
    }
  }
}

export default new NotificationsController();
