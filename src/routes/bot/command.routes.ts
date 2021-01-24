import CommandController from '../../controllers/command.controller';

import Commands from '../../enums/Commands';

import BotContext from '../../interfaces/BotContext';

export default async function commandRouter(ctx: BotContext): Promise<void> {
  switch (ctx.session.command.curr) {
    case Commands.START:
      await CommandController.onStart(ctx);
      break;

    case Commands.HELP:
      await CommandController.onHelp(ctx);
      break;

    case Commands.LINK:
      await CommandController.onLink(ctx);
      break;

    case Commands.CHANGE_SECRET:
      await CommandController.onSecretChange(ctx);
      break;

    case Commands.LIST:
      await CommandController.onList(ctx);
      break;

    case Commands.DELETE:
      await CommandController.onDelete(ctx);
      break;

    case Commands.CANCEL:
      await CommandController.onCancel(ctx);
      break;

    default:
      await CommandController.onUnsupported(ctx);
      break;
  }
}
