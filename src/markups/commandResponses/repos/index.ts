import { readFileSync } from 'fs';

const noReposMarkdown = readFileSync(`${__dirname}/noRepos.md`, 'utf8');
const repoRequiredMarkdown = readFileSync(`${__dirname}/repoRequired.md`, 'utf8');

export { noReposMarkdown, repoRequiredMarkdown };
