import { githubAPI } from '../API';

import GithubRepo from '../../../interfaces/entities/GithubRepo';

export default async function getRepo(owner: string, repo: string): Promise<GithubRepo> {
  return await githubAPI.get(`${owner}/${repo}`).then((res) => JSON.parse(res.data));
}
