import { Schema, model } from 'mongoose';
import GithubRepo from '../interfaces/entities/GithubRepo';

import { Repo, RepoDoc } from '../interfaces/entities/Repo';
import { ChatDoc } from '../interfaces/entities/Chat';

const repoSchema: Schema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    title: { type: String, required: true },
    repo: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

const RepoModel = model<RepoDoc>('Repo', repoSchema);

export default class RepoClass extends RepoModel {
  static async addRepo({ owner, title, repo }: Repo): Promise<RepoDoc> {
    try {
      const createdDoc: RepoDoc = await this.create({
        owner,
        title,
        repo,
      });

      return createdDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteRepo(id: RepoDoc['id']): Promise<RepoDoc> {
    try {
      const deletedDoc: RepoDoc = await this.findByIdAndDelete(id);

      return deletedDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getRepoByDocId(id: RepoDoc['id']): Promise<RepoDoc> {
    try {
      const foundDoc: RepoDoc = await this.findById(id);

      return foundDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getRepoById(id: GithubRepo['id']): Promise<RepoDoc> {
    try {
      const foundDoc: RepoDoc = await this.findOne({ 'repo.id': id });

      return foundDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getRepoByTitle(owner: ChatDoc['id'], title: RepoDoc['title']): Promise<RepoDoc | null> {
    try {
      const foundDoc: RepoDoc | null = await this.findOne({ $and: [{ owner }, { title }] });

      return foundDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getRepos(owner: GithubRepo['owner_name'], name: GithubRepo['name']): Promise<RepoDoc[]> {
    try {
      const foundDocs: RepoDoc[] = await this.find({
        $and: [{ 'repo.owner_name': owner }, { 'repo.name': name }],
      });

      return foundDocs;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllReposByChat(owner: ChatDoc['id']): Promise<RepoDoc[]> {
    try {
      const foundDocs: RepoDoc[] = await this.find({ owner });

      return foundDocs;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
