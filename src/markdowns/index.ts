import { readFileSync } from 'fs';

const helpMarkdown = readFileSync(`${__dirname}/commandResponses/help.md`, 'utf8');
const startMarkdown = readFileSync(`${__dirname}/commandResponses/start.md`, 'utf8');

export { helpMarkdown, startMarkdown };
