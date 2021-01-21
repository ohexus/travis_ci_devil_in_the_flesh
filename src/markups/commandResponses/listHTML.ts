import { RepoDoc } from '../../interfaces/entities/Repo';

export default function listHTML(
  repos: RepoDoc[],
  showLinks: boolean = true,
  heading: string = 'repos',
  afterword?: string,
): string {
  return `${heading}:\n\n${repos
    .map((repoDoc, index) => `${index + 1}. ${repoDoc.repo.name}${showLinks ? `:\n${repoDoc.repo.html_url}` : ''};`)
    .reduce((acc: string, curr: string) => acc + curr + '\n\n', '')}${afterword || ''}`;
}
