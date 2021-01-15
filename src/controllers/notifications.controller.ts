import { Request, Response } from 'express';

import bot from '../bot';

import buildStatusHTML from '../markups/buildStatusHTML';

class NotificationsController {
  constructor() {}

  // TODO
  async postNotify(req: Request, res: Response) {
    console.log(req.body);

    const buildHTML = buildStatusHTML(req.body);

    bot.telegram.sendMessage(0, buildHTML, { parse_mode: 'HTML' });
  }
}

export default new NotificationsController();
