import { Context } from 'telegraf';

import Commands from '../enums/Commands';
import Steps from '../enums/Steps';

import { RepoDoc } from './entities/Repo';

export interface SessionData {
  step: Steps | null;
  addedRepoId: RepoDoc['id'] | null;
  command: {
    prev: Commands | null;
    curr: Commands | null;
  };
}

export default interface BotContext extends Context {
  session: SessionData;
  message: { text: string } & Context['message'];
}
