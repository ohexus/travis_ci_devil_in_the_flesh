import { Document } from 'mongoose';
import { UserDoc } from './User';

export interface RepoLink {
  owner: UserDoc['id'];

  name: string;
  url: string;
}

export interface RepoLinkDoc extends RepoLink, Document {}
