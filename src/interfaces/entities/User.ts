import { Document } from 'mongoose';
import { User as UserTelegram } from 'telegraf/typings/telegram-types';
import { RepoLinkDoc } from './RepoLink';

export interface UserBasic {
  telegramId: UserTelegram['id'];
}

export interface User extends UserBasic {
  repos: Array<RepoLinkDoc['_id']>;
}

export interface UserDoc extends User, Document {}
