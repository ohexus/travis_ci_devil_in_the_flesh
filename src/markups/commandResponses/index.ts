import { readFileSync } from 'fs';

import {
  linkFormatMarkdown,
  linkWrongMarkdown,
  linkSuccessMarkdown,
  linkRequiredMarkdown,
  linkErrorMarkdown,
} from './links';

const helpMarkdown = readFileSync(`${__dirname}/help.md`, 'utf8');
const startMarkdown = readFileSync(`${__dirname}/start.md`, 'utf8');
const unsupportedCommandMarkdown = readFileSync(`${__dirname}/unsupportedCommand.md`, 'utf8');

export {
  helpMarkdown,
  linkErrorMarkdown,
  linkFormatMarkdown,
  linkRequiredMarkdown,
  linkSuccessMarkdown,
  linkWrongMarkdown,
  startMarkdown,
  unsupportedCommandMarkdown,
};
