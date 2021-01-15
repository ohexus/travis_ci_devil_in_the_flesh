import { Document } from 'mongoose';
import { Chat, User as UserTelegram } from 'telegraf/typings/telegram-types';
import { RepoDoc } from './Repo';

export interface UserBasic {
  telegramId: UserTelegram['id'];
  chatId: Chat['id'];
}

export interface User extends UserBasic {
  repos: Array<RepoDoc['id']>;
}

export interface UserDoc extends User, Document {}
