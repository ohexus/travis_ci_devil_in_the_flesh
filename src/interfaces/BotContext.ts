import { Context } from 'telegraf';

import Commands from '../enums/Commands';
import Steps from '../enums/Steps';

export interface SessionData {
  step: Steps | null;
  command: {
    prev: Commands | null;
    curr: Commands | null;
  };
}

export default interface BotContext extends Context {
  session: SessionData;
  message: { text?: string } & Context['message'];
}
