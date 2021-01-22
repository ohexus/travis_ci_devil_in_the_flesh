import { readFileSync } from 'fs';

import secretSavedHTML from './secretSavedHTML';

const secretErrorMarkdown = readFileSync(`${__dirname}/secretError.md`, 'utf8');
const secretFormatMarkdown = readFileSync(`${__dirname}/secretFormat.md`, 'utf8');
const secretRequiredMarkdown = readFileSync(`${__dirname}/secretRequired.md`, 'utf8');

export { secretErrorMarkdown, secretFormatMarkdown, secretRequiredMarkdown, secretSavedHTML };
