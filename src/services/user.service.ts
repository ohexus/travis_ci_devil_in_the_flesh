import { UserClass } from '../models';

import { User, UserBasic, UserDoc } from '../interfaces/entities/User';
import { RepoDoc } from '../interfaces/entities/Repo';

class UserService {
  async addUser(user: UserBasic): Promise<UserDoc> {
    return await UserClass.addUser(user);
  }

  async getUserById(id: UserDoc['id']): Promise<UserDoc> {
    return await UserClass.getUserById(id);
  }

  async getUserByTelegramId(telegramId: User['telegramId']): Promise<UserDoc | null> {
    return await UserClass.getUserByTelegramId(telegramId);
  }

  async addRepo(owner: UserDoc['id'], repoId: RepoDoc['id']): Promise<UserDoc> {
    return await UserClass.addRepo(owner, repoId);
  }

  async deleteRepo(owner: UserDoc['id'], repoId: RepoDoc['id']): Promise<UserDoc> {
    return await UserClass.deleteRepo(owner, repoId);
  }
}

export default new UserService();
