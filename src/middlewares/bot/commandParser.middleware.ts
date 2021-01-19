import { CommandController } from '../../controllers';

import { commandRegex, commandWithBotNameRegex } from '../../regexes';

import Commands from '../../enums/Commands';

import BotContext from '../../interfaces/BotContext';
import NextFunction from '../../interfaces/NextFunction';

export default async function commandParserMiddleware(ctx: BotContext, next: NextFunction): Promise<void> {
  if (!ctx.message.text) {
    await CommandController.onStart(ctx);
    return;
  }

  const messageText = (ctx.message.text = ctx.message.text.trim());

  if (ctx.message.chat.type === 'private') {
    if (!commandRegex.test(messageText)) {
      next();
      return;
    }
  } else {
    if (!commandWithBotNameRegex.test(messageText)) {
      next();
      return;
    }
  }

  const command = messageText.slice(1).split(' ')[0].split('@')[0];

  ctx.session = Object.values(Commands).includes(command as Commands)
    ? {
        step: command === Commands.CANCEL ? ctx.session.step : null,
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
