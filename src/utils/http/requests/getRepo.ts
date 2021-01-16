import { githubAPI } from '../API';

import GithubRepo from '../../../interfaces/entities/GithubRepo';
import logger from '../../logger';

export default async function getRepo(owner: string, repo: string): Promise<GithubRepo | null> {
  try {
    return await githubAPI.get(`repos/${owner}/${repo}`).then((res) => {
      const { id, name, full_name, html_url } = res.data;
      return { id, name, full_name, html_url } as GithubRepo;
    });
  } catch (err) {
    logger.error(err);
    return null;
  }
}
