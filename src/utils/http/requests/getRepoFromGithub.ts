import { githubAPI } from '../API';

import GithubRepo from '../../../interfaces/entities/GithubRepo';
import logger from '../../logger';

export default async function getRepoFromGithub(owner: string, repo: string): Promise<GithubRepo | null> {
  try {
    return await githubAPI.get(`repos/${owner}/${repo}`).then((res) => {
      const { data } = res;

      if (!data) {
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        owner_name: data.owner.login,
        full_name: data.full_name,
        html_url: data.html_url,
        api_url: data.url,
      } as GithubRepo;
    });
  } catch (err) {
    logger.error(err);
    return null;
  }
}
