import { UserClass } from '../models';

import { User, UserBasic, UserDoc } from '../interfaces/entities/User';
import { RepoLinkDoc } from '../interfaces/entities/RepoLink';

class UserService {
  async addUser(user: UserBasic): Promise<UserDoc> {
    return await UserClass.addUser(user);
  }

  async getUserByTelegramId(telegramId: User['telegramId']): Promise<UserDoc | null> {
    return await UserClass.getUserByTelegramId(telegramId);
  }

  async addLink(owner: UserDoc['id'], linkId: RepoLinkDoc['id']): Promise<UserDoc> {
    return await UserClass.addLink(owner, linkId);
  }

  async deleteLink(owner: UserDoc['id'], linkId: RepoLinkDoc['id']): Promise<UserDoc> {
    return await UserClass.deleteLink(owner, linkId);
  }
}

export default new UserService();
