import CtxMessageText from '../interfaces/CtxMessageText';
import NextFunction from '../interfaces/NextFunction';

export default async function logMessageMiddleware(ctx: CtxMessageText, next: NextFunction) {
  if (!!ctx.message.text) {
    console.log('Message: %s', ctx.message.text);
  }

  await next();
}
