import { Document } from 'mongoose';

import { ChatDoc } from './Chat';
import GithubRepo from './GithubRepo';

export interface Repo {
  owner: ChatDoc['id'];
  title: string;
  repo: GithubRepo;
}

export interface RepoDoc extends Repo, Document {}
