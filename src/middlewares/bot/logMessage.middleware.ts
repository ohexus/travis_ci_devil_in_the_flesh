import BotContext from '../../interfaces/BotContext';
import NextFunction from '../../interfaces/NextFunction';

export default async function logMessageMiddleware(ctx: BotContext, next: NextFunction): Promise<void> {
  if (!!ctx.message.text) {
    console.log('Message: %s', ctx.message.text);
  }

  await next();
}
