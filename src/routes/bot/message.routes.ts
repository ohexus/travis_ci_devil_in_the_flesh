import c from 'config';
import CommandController from '../../controllers/command.controller';

import Steps from '../../enums/Steps';

import BotContext from '../../interfaces/BotContext';

export default function messageRouter(ctx: BotContext) {
  if (!!ctx.message && !!ctx.message.text && !!ctx.session) {
    switch (ctx.session.step) {
      case Steps.LINK:
        CommandController.onLinkReply(ctx);
        break;

      case Steps.DELETE:
        CommandController.onDeleteReply(ctx);
        break;

      default:
        CommandController.onHelp(ctx);
        break;
    }
  }
}
