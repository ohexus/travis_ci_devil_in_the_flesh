import CommandController from '../../controllers/command.controller';

import Steps from '../../enums/Steps';

import BotContext from '../../interfaces/BotContext';

export default async function messageRouter(ctx: BotContext): Promise<void> {
  switch (ctx.session.step) {
    case Steps.LINK:
      await CommandController.onLinkReply(ctx);
      break;

    case Steps.DELETE:
      await CommandController.onDeleteReply(ctx);
      break;

    case Steps.SECRET:
      await CommandController.onSecretReply(ctx);
      break;

    default:
      await CommandController.onHelp(ctx);
      break;
  }
}
