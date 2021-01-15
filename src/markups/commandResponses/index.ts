import { readFileSync } from 'fs';

const helpMarkdown = readFileSync(`${__dirname}/help.md`, 'utf8');
const startMarkdown = readFileSync(`${__dirname}/start.md`, 'utf8');
const unsupportedCommandMarkdown = readFileSync(`${__dirname}/unsupportedCommand.md`, 'utf8');

export { helpMarkdown, startMarkdown, unsupportedCommandMarkdown };
