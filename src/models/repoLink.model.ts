import { Schema, model } from 'mongoose';

import { RepoLink, RepoLinkDoc } from '../interfaces/entities/RepoLink';
import { UserDoc } from '../interfaces/entities/User';

const repoLinkSchema: Schema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, unique: true, required: true },
    url: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

const RepoLinkModel = model<RepoLinkDoc>('RepoLink', repoLinkSchema);

export default class RepoLinkClass extends RepoLinkModel {
  static async addLink({ owner, name, url }: RepoLink): Promise<RepoLinkDoc> {
    try {
      const createdDoc: RepoLinkDoc = await this.create({
        owner,
        name,
        url,
      });

      return createdDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteLink(id: RepoLinkDoc['id']): Promise<RepoLinkDoc> {
    try {
      const deletedDoc: RepoLinkDoc = await this.findByIdAndDelete(id);

      return deletedDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getLink(id: RepoLinkDoc['id']): Promise<RepoLinkDoc> {
    try {
      const foundDoc: RepoLinkDoc = await this.findById(id);

      return foundDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getLinkByName(name: RepoLinkDoc['name'], owner: UserDoc['id']): Promise<RepoLinkDoc> {
    try {
      const foundDoc: RepoLinkDoc = await this.findOne({ $and: [{ owner }, { name }] });

      return foundDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getLinkByUrl(url: RepoLinkDoc['url']): Promise<RepoLinkDoc> {
    try {
      const foundDoc: RepoLinkDoc = await this.findOne({ url });

      console.log(foundDoc);

      return foundDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllLinksByUser(owner: UserDoc['id']): Promise<RepoLinkDoc[]> {
    try {
      const foundDocs: RepoLinkDoc[] = await this.find({ owner });

      return foundDocs;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
