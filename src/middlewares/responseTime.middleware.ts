import { Context } from 'telegraf';

export default async function responseTimeMiddleware(ctx: Context, next: () => Promise<void>) {
  const start = new Date().getMilliseconds();

  await next();

  const ms = new Date().getMilliseconds() - start;
  console.log('Response time: %sms', ms);
}
