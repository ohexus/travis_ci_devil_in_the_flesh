import CommandController from '../../controllers/command.controller';

import { commandWithBotNameRegex } from '../../regexes';

import Commands from '../../enums/Commands';

import BotContext from '../../interfaces/BotContext';

export default function commandRouter(ctx: BotContext): void {
  if (ctx.message.chat.type !== 'private' && !!ctx.message.text) {
    if (!commandWithBotNameRegex.test(ctx.message.text)) {
      return;
    }
  }

  if (!ctx.message.text) {
    CommandController.onUnsupported(ctx);
    return;
  }

  const command = ctx.message.text.slice(1).split(' ')[0].split('@')[0];

  switch (command) {
    case Commands.START:
      console.log(ctx.message);
      CommandController.onStart(ctx);
      break;

    case Commands.HELP:
      CommandController.onHelp(ctx);
      break;

    case Commands.LINK:
      CommandController.onLink(ctx);
      break;

    case Commands.LIST:
      CommandController.onList(ctx);
      break;

    case Commands.DELETE:
      CommandController.onDelete(ctx);
      break;

    case Commands.CANCEL:
      CommandController.onCancel(ctx);
      break;

    default:
      CommandController.onUnsupported(ctx);
      break;
  }
}
