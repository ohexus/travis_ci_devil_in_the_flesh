import { Document } from 'mongoose';

import { ChatDoc } from './Chat';
import GithubRepo from './GithubRepo';

export interface RepoBasic {
  owner: ChatDoc['id'];
  title: string;
  repo: GithubRepo;
}

export interface Repo extends RepoBasic {
  secret: string;
}

export interface RepoDoc extends Repo, Document {}
