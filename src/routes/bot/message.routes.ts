import c from 'config';
import CommandController from '../../controllers/command.controller';

import Steps from '../../enums/Steps';

import BotContext from '../../interfaces/BotContext';

export default function messageRouter(ctx: BotContext) {
  console.log(ctx.session);
  if (!!ctx.message && !!ctx.message.text && !!ctx.session) {
    if (ctx.session.step === Steps.LINK) {
      CommandController.onLinkReply(ctx);
    }
  }
}
