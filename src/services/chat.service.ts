import { ChatClass } from '../models';

import { Chat, ChatBasic, ChatDoc } from '../interfaces/entities/Chat';
import { RepoDoc } from '../interfaces/entities/Repo';

class ChatService {
  async addChat(Chat: ChatBasic): Promise<ChatDoc> {
    return await ChatClass.addChat(Chat);
  }

  async getChatById(id: ChatDoc['id']): Promise<ChatDoc> {
    return await ChatClass.getChatById(id);
  }

  async getChatByTelegramId(telegramId: Chat['telegramId']): Promise<ChatDoc | null> {
    return await ChatClass.getChatByTelegramId(telegramId);
  }

  async addRepo(owner: ChatDoc['id'], repoId: RepoDoc['id']): Promise<ChatDoc> {
    return await ChatClass.addRepo(owner, repoId);
  }

  async deleteRepo(owner: ChatDoc['id'], repoId: RepoDoc['id']): Promise<ChatDoc> {
    return await ChatClass.deleteRepo(owner, repoId);
  }
}

export default new ChatService();
