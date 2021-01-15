import { Document } from 'mongoose';
import { UserDoc } from './User';

export interface RepoLink {
  owner: UserDoc['id'];

  name: string;
  link: string;
}

export interface RepoLinkDoc extends RepoLink, Document {}
