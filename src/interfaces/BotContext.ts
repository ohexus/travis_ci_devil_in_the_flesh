import { Context } from 'telegraf';

import Steps from '../enums/Steps';

export interface SessionData {
  step: Steps | null;
}

export default interface BotContext extends Context {
  session: SessionData;
  message: { text?: string } & Context['message'];
}
