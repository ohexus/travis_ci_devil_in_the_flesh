import { CommandController } from '../../controllers';

import { commandWithBotNameRegex } from '../../regexes';

import Commands from '../../enums/Commands';

import BotContext from '../../interfaces/BotContext';
import NextFunction from '../../interfaces/NextFunction';

export default async function commandMiddleware(ctx: BotContext, next: NextFunction): Promise<void> {
  if (!ctx.message.text) {
    await CommandController.onUnsupported(ctx);
    return;
  }

  if (ctx.message.chat.type !== 'private' && !!ctx.message.text) {
    if (!commandWithBotNameRegex.test(ctx.message.text)) {
      return;
    }
  }

  const command = ctx.message.text.slice(1).split(' ')[0].split('@')[0];

  ctx.session = Object.values(Commands).includes(command as Commands)
    ? {
        step: null,
        command: {
          prev: ctx.session.command.curr,
          curr: command as Commands,
        },
      }
    : {
        ...ctx.session,
        command: {
          ...ctx.session.command,
          curr: null,
        },
      };

  next();
}
