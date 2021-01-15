import { readFileSync } from 'fs';

const noReposMarkdown = readFileSync(`${__dirname}/noRepos.md`, 'utf8');
const ownerRequiredMarkdown = readFileSync(`${__dirname}/ownerRequired.md`, 'utf8');
const repoErrorMarkdown = readFileSync(`${__dirname}/repoError.md`, 'utf8');
const repoFormatMarkdown = readFileSync(`${__dirname}/repoFormat.md`, 'utf8');
const repoNotExistsMarkdown = readFileSync(`${__dirname}/repoNotExists.md`, 'utf8');
const repoRequiredMarkdown = readFileSync(`${__dirname}/repoRequired.md`, 'utf8');
const repoSuccessMarkdown = readFileSync(`${__dirname}/repoSuccess.md`, 'utf8');
const titleRequiredMarkdown = readFileSync(`${__dirname}/titleRequired.md`, 'utf8');

export {
  noReposMarkdown,
  ownerRequiredMarkdown,
  repoErrorMarkdown,
  repoFormatMarkdown,
  repoNotExistsMarkdown,
  repoRequiredMarkdown,
  repoSuccessMarkdown,
  titleRequiredMarkdown,
};
