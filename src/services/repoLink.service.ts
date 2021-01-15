import { RepoLinkClass } from '../models';
import { UserService } from '.';

import { RepoLink, RepoLinkDoc } from '../interfaces/entities/RepoLink';
import { User } from '../interfaces/entities/User';

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

  async getAllLinksByUser(telegramId: User['telegramId']): Promise<RepoLinkDoc[]> {
    const user = await UserService.getUserByTelegramId(telegramId);

    if (!!user) {
      return await RepoLinkClass.getAllLinksByUser(user.id);
    }

    return [];
  }
}

export default new RepoLinkService();
