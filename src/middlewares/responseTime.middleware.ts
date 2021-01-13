import { Context } from 'telegraf';

import NextFunction from '../interfaces/NextFunction';

export default async function responseTimeMiddleware(ctx: Context, next: NextFunction) {
  const start = new Date().getMilliseconds();

  await next();

  const ms = new Date().getMilliseconds() - start;
  console.log('Response time: %sms', ms);
}
