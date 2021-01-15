import { RepoLinkClass } from '../models';
import { UserService } from '.';

import { RepoLink, RepoLinkDoc } from '../interfaces/entities/RepoLink';
import { User, UserDoc } from '../interfaces/entities/User';

class RepoLinkService {
  async addLink(repoLink: RepoLink): Promise<RepoLinkDoc> {
    return await RepoLinkClass.addLink(repoLink);
  }

  async deleteLink(id: RepoLinkDoc['id']): Promise<RepoLinkDoc> {
    return await RepoLinkClass.deleteLink(id);
  }

  async getLink(id: RepoLinkDoc['id']): Promise<RepoLinkDoc> {
    return await RepoLinkClass.getLink(id);
  }

  async getLinkByName(name: RepoLinkDoc['name'], owner: UserDoc['id']): Promise<RepoLinkDoc> {
    return await RepoLinkClass.getLinkByName(name, owner);
  }

  async getAllLinksByUser(telegramId: User['telegramId']): Promise<RepoLinkDoc[]> {
    const user = await UserService.getUserByTelegramId(telegramId);

    if (!!user) {
      return await RepoLinkClass.getAllLinksByUser(user.id);
    }

    return [];
  }

  async getList(telegramId: User['telegramId'], withLinks: boolean = true): Promise<string> {
    const listArray = await this.getAllLinksByUser(telegramId);

    return listArray
      .map((repo) => `${repo.name}${withLinks ? `: ${repo.link}` : ''}`)
      .reduce((acc: string, curr: string) => acc + curr + '\n', '');
  }
}

export default new RepoLinkService();
