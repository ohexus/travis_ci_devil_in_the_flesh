import { Response } from 'express';

import { LOGS, STATUSES } from '../../constants';

import log4js from 'log4js';
const logger = log4js.getLogger();

export default function successResponse(
  res: Response,
  message: string = LOGS.SUCCESS.HTTP.DEFAULT,
  payload: any | null = null,
  status: number = STATUSES.RESPONSE.SUCCESS.DEFAULT,
) {
  logger.info(message);

  return res.json({
    success: true,
    payload,
    status,
    message,
  });
}
