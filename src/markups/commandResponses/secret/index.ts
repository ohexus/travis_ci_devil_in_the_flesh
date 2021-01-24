import { readFileSync } from 'fs';

import secretFormatHTML from './secretFormatHTML';
import secretSavedHTML from './secretSavedHTML';

const secretChangeMarkdown = readFileSync(`${__dirname}/secretChange.md`, 'utf8');
const secretErrorMarkdown = readFileSync(`${__dirname}/secretError.md`, 'utf8');
const secretRequiredMarkdown = readFileSync(`${__dirname}/secretRequired.md`, 'utf8');

export { secretChangeMarkdown, secretErrorMarkdown, secretFormatHTML, secretRequiredMarkdown, secretSavedHTML };
