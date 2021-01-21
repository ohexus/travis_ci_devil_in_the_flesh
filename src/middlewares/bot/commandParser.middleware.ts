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

  const isCommandFormatValid =
    ctx.message.chat.type === 'private' ? commandRegex.test(messageText) : commandWithBotNameRegex.test(messageText);

  if (!isCommandFormatValid) {
    next();
    return;
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
          prev: ctx.session.command.curr || ctx.session.command.prev,
          curr: null,
        },
      };

  next();
}
