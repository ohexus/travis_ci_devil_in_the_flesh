import { RepoClass } from '../models';
import { UserService } from '.';

import { Repo, RepoDoc } from '../interfaces/entities/Repo';
import { User, UserDoc } from '../interfaces/entities/User';
import GithubRepo from '../interfaces/entities/GithubRepo';

class RepoService {
  async addRepo(repo: Repo): Promise<RepoDoc> {
    return await RepoClass.addRepo(repo);
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

  async getRepoByTitle(title: RepoDoc['title'], owner: UserDoc['id']): Promise<RepoDoc | null> {
    return await RepoClass.getRepoByTitle(owner, title);
  }

  async getRepo(owner: GithubRepo['owner_name'], name: GithubRepo['name']): Promise<RepoDoc | null> {
    return await RepoClass.getRepo(owner, name);
  }

  async getAllReposByUser(telegramId: User['telegramId']): Promise<RepoDoc[]> {
    const user = await UserService.getUserByTelegramId(telegramId);

    if (!!user) {
      return await RepoClass.getAllReposByUser(user.id);
    }

    return [];
  }

  async getList(telegramId: User['telegramId'], withLinks: boolean = true): Promise<string> {
    const listArray = await this.getAllReposByUser(telegramId);

    return listArray
      .map(
        (repoDoc, index) =>
          `${repoDoc.repo.name}${withLinks ? `: ${repoDoc.repo.html_url}` : index === listArray.length - 1 ? '' : ','}`,
      )
      .reduce((acc: string, curr: string) => acc + curr + '\n', '');
  }
}

export default new RepoService();
