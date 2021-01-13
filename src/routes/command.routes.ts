import CommandController from '../controllers/command.controller';

import Commands from '../enums/Commands';

import CtxMessageText from '../interfaces/CtxMessageText';

export default function commandRouter(ctx: CtxMessageText) {
  if (!ctx.message.text) return CommandController.onUnsupported(ctx);

  const command = ctx.message.text.slice(1);

  switch (command) {
    case Commands.START:
      CommandController.onStart(ctx);
      break;

    case Commands.HELP:
      CommandController.onHelp(ctx);
      break;

    default:
      CommandController.onUnsupported(ctx);
      break;
  }
}
