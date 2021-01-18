import { Schema, model } from 'mongoose';

import { Chat, ChatBasic, ChatDoc } from '../interfaces/entities/Chat';
import { RepoDoc } from '../interfaces/entities/Repo';

const chatSchema: Schema = new Schema(
  {
    telegramId: { type: Number, unique: true, required: true },
    repos: { type: [Schema.Types.ObjectId], ref: 'Repo', default: [] },
  },
  { timestamps: true },
);

const ChatModel = model<ChatDoc>('Chat', chatSchema);

export default class ChatClass extends ChatModel {
  static async addChat(Chat: ChatBasic): Promise<ChatDoc> {
    try {
      const { telegramId } = Chat;

      const createdDoc: ChatDoc = await this.create({
        telegramId,
        repos: [],
      });

      return createdDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getChatById(id: ChatDoc['id']): Promise<ChatDoc> {
    try {
      const chatDoc: ChatDoc = await this.findById(id);

      return chatDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getChatByTelegramId(telegramId: Chat['telegramId']): Promise<ChatDoc | null> {
    try {
      const chatDoc: ChatDoc | null = await this.findOne({ telegramId });

      return chatDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addRepo(owner: ChatDoc['id'], repoId: RepoDoc['id']): Promise<ChatDoc> {
    try {
      const updatedDoc: ChatDoc = await this.findByIdAndUpdate(
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

  static async deleteRepo(owner: ChatDoc['id'], repoId: RepoDoc['id']): Promise<ChatDoc> {
    try {
      const updatedDoc: ChatDoc = await this.findByIdAndUpdate(
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
