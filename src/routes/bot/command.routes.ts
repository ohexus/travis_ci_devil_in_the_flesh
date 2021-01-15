import CommandController from '../../controllers/command.controller';

import Commands from '../../enums/Commands';

import BotContext from '../../interfaces/BotContext';

export default function commandRouter(ctx: BotContext) {
  if (!ctx.message.text) return CommandController.onUnsupported(ctx);

  const command = ctx.message.text.slice(1).split(' ')[0];

  switch (command) {
    case Commands.START:
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
