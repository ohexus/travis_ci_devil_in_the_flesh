import { CommandController } from '../../controllers';

import { commandRegex, commandWithBotNameRegex } from '../../regexes';

import { RepoService } from '../../services';

import Commands from '../../enums/Commands';
import Steps from '../../enums/Steps';

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

  const isCommandSupported = Object.values(Commands).includes(command as Commands);

  if (
    isCommandSupported &&
    command !== Commands.CANCEL &&
    !!ctx.session.addedRepoId &&
    ctx.session.step === Steps.SECRET
  ) {
    await RepoService.deleteRepo(ctx.session.addedRepoId);

    ctx.session.step = null;
    ctx.session.addedRepoId = null;
  }

  ctx.session = isCommandSupported
    ? {
        step: command === Commands.CANCEL ? ctx.session.step : null,
        addedRepoId: command === Commands.CANCEL ? ctx.session.addedRepoId : null,
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
