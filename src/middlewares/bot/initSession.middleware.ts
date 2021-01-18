import BotContext from '../../interfaces/BotContext';
import NextFunction from '../../interfaces/NextFunction';

export default async function initSessionMiddleware(ctx: BotContext, next: NextFunction) {
  if (!ctx.session) {
    ctx.session = {
      step: null,
    };
  }

  next();
}
