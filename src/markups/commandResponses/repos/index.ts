import { readFileSync } from 'fs';

const repoRequiredMarkdown = readFileSync(`${__dirname}/repoRequired.md`, 'utf8');

export { repoRequiredMarkdown };
