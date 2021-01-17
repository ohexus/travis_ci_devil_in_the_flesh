import { RepoDoc } from '../../interfaces/entities/Repo';

export default function listHTML(
  repos: RepoDoc[],
  withLinks: boolean = true,
  heading: string = 'repos',
  afterword?: string,
): string {
  return `${heading}:\n\n${repos
    .map(
      (repoDoc, index) =>
        `${repoDoc.repo.name}${withLinks ? `: ${repoDoc.repo.html_url}` : ''}${index === repos.length - 1 ? '.' : ';'}`,
    )
    .reduce((acc: string, curr: string) => acc + curr + '\n\n', '')}${afterword || ''}`;
}
