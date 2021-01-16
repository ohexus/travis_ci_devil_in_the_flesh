import { Document } from 'mongoose';

import { UserDoc } from './User';
import GithubRepo from './GithubRepo';

export interface Repo {
  owner: UserDoc['id'];
  title: string;
  repo: GithubRepo;
}

export interface RepoDoc extends Repo, Document {}
