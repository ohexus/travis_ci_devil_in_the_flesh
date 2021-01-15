import { Schema, model } from 'mongoose';

import { User, UserBasic, UserDoc } from '../interfaces/entities/User';
import { RepoLinkDoc } from '../interfaces/entities/RepoLink';

const userSchema: Schema = new Schema(
  {
    telegramId: { type: Number, unique: true, required: true },
    repos: { type: [Schema.Types.ObjectId], ref: 'RepoLink', default: [] },
  },
  { timestamps: true },
);

const UserModel = model<UserDoc>('User', userSchema);

export default class UserClass extends UserModel {
  static async addUser(user: UserBasic): Promise<UserDoc> {
    try {
      const { telegramId } = user;

      const createdDoc: UserDoc = await this.create({
        telegramId,
        repos: [],
      });

      return createdDoc;
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

  static async addLink(owner: UserDoc['_id'], linkId: RepoLinkDoc['_id']): Promise<UserDoc> {
    try {
      const updatedDoc: UserDoc = await this.findByIdAndUpdate(
        owner,
        {
          $addToSet: { repos: linkId },
        },
        { new: true },
      );

      return updatedDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteLink(owner: UserDoc['_id'], linkId: RepoLinkDoc['_id']): Promise<UserDoc> {
    try {
      const updatedDoc: UserDoc = await this.findByIdAndUpdate(
        owner,
        {
          $pull: { repos: linkId },
        },
        { new: true },
      );

      return updatedDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
