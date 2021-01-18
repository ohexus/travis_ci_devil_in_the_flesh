import { Document } from 'mongoose';
import { Chat as ChatTelegram } from 'telegraf/typings/telegram-types';
import { RepoDoc } from './Repo';

export interface ChatBasic {
  telegramId: ChatTelegram['id'];
}

export interface Chat extends ChatBasic {
  repos: Array<RepoDoc['id']>;
}

export interface ChatDoc extends Chat, Document {}
