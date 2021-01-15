import { Schema, model } from 'mongoose';

import { User, UserBasic, UserDoc } from '../interfaces/entities/User';
import { RepoDoc } from '../interfaces/entities/Repo';

const userSchema: Schema = new Schema(
  {
    telegramId: { type: Number, unique: true, required: true },
    chatId: { type: Number, unique: true, required: true },
    repos: { type: [Schema.Types.ObjectId], ref: 'Repo', default: [] },
  },
  { timestamps: true },
);

const UserModel = model<UserDoc>('User', userSchema);

export default class UserClass extends UserModel {
  static async addUser(user: UserBasic): Promise<UserDoc> {
    try {
      const { telegramId, chatId } = user;

      const createdDoc: UserDoc = await this.create({
        telegramId,
        chatId,
        repos: [],
      });

      return createdDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUserById(id: UserDoc['id']): Promise<UserDoc> {
    try {
      const userDoc: UserDoc = await this.findById(id);

      return userDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUserByTelegramId(telegramId: User['telegramId']): Promise<UserDoc | null> {
    try {
      const userDoc: UserDoc | null = await this.findOne({ telegramId });

      return userDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addRepo(owner: UserDoc['id'], repoId: RepoDoc['id']): Promise<UserDoc> {
    try {
      const updatedDoc: UserDoc = await this.findByIdAndUpdate(
        owner,
        {
          $addToSet: { repos: repoId },
        },
        { new: true },
      );

      return updatedDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteRepo(owner: UserDoc['id'], repoId: RepoDoc['id']): Promise<UserDoc> {
    try {
      const updatedDoc: UserDoc = await this.findByIdAndUpdate(
        owner,
        {
          $pull: { repos: repoId },
        },
        { new: true },
      );

      return updatedDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
