import { Request, Response } from 'express';

import { LOGS } from '../constants';

import { SecretService } from '../services';

import logger from '../utils/logger';

class SecretController {
  constructor() {}

  postSecret(req: Request, res: Response): void {
    try {
      const { secret, repository } = req.body as { secret: string; repository: string };
      if (!secret) {
        throw new Error(LOGS.ERROR.SECRET.NOT_PROVIDED);
      }
      if (!repository) {
        throw new Error(LOGS.ERROR.REPO.NOT_PROVIDED);
      }

      const [owner, repoName] = repository.split('/');

      if (!owner || !repoName) {
        throw new Error(LOGS.ERROR.REPO.INVALID_FORMAT);
      }

      SecretService.addSecret({ value: secret, owner, repoName });
    } catch (err) {
      logger.error(err);
    }
  }
}

export default new SecretController();
