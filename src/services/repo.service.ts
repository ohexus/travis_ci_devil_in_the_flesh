import { RepoClass } from '../models';
import { ChatService } from '.';

import { RepoBasic, RepoDoc } from '../interfaces/entities/Repo';
import { Chat, ChatDoc } from '../interfaces/entities/Chat';
import GithubRepo from '../interfaces/entities/GithubRepo';

class RepoService {
  async addRepo(repo: RepoBasic): Promise<RepoDoc> {
    return await RepoClass.addRepo(repo);
  }

  async addSecret(id: RepoDoc['id'], secret: string) {
    return await RepoClass.addSecret(id, secret);
  }

  async deleteRepo(id: RepoDoc['id']): Promise<RepoDoc> {
    return await RepoClass.deleteRepo(id);
  }

  async getRepoByDocId(id: RepoDoc['id']): Promise<RepoDoc> {
    return await RepoClass.getRepoByDocId(id);
  }

  async getRepoById(id: GithubRepo['id']): Promise<RepoDoc> {
    return await RepoClass.getRepoById(id);
  }

  async getRepoByTitle(owner: ChatDoc['id'], title: RepoDoc['title']): Promise<RepoDoc | null> {
    return await RepoClass.getRepoByTitle(owner, title);
  }

  async getRepos(
    owner: GithubRepo['owner_name'],
    name: GithubRepo['name'],
    secret: RepoDoc['secret'],
  ): Promise<RepoDoc[]> {
    return await RepoClass.getRepos(owner, name, secret);
  }

  async getAllReposByChat(telegramId: Chat['telegramId']): Promise<RepoDoc[]> {
    const chat = await ChatService.getChatByTelegramId(telegramId);

    if (!!chat) {
      return await RepoClass.getAllReposByChat(chat.id);
    }

    return [];
  }
}

export default new RepoService();
