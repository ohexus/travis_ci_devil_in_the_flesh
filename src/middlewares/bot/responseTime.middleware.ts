import BotContext from '../../interfaces/BotContext';
import NextFunction from '../../interfaces/NextFunction';

export default async function responseTimeMiddleware(ctx: BotContext, next: NextFunction): Promise<void> {
  const start = new Date().getMilliseconds();

  await next();

  const ms = new Date().getMilliseconds() - start;
  console.log('Response time: %sms', ms);
}
