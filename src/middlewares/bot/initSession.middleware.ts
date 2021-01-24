import BotContext from '../../interfaces/BotContext';
import NextFunction from '../../interfaces/NextFunction';

export default async function initSessionMiddleware(ctx: BotContext, next: NextFunction): Promise<void> {
  if (!ctx.session) {
    ctx.session = {
      step: null,
      repoIdForSecret: null,
      command: {
        prev: null,
        curr: null,
      },
    };
  }

  next();
}
