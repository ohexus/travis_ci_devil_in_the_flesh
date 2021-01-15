import { githubAPI } from '../API';

import GithubRepo from '../../../interfaces/entities/GithubRepo';

export default async function getRepo(owner: string, repo: string): Promise<GithubRepo> {
  return await githubAPI.get(`repos/${owner}/${repo}`).then((res) => res.data);
}
