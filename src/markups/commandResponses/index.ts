import { readFileSync } from 'fs';

import { cancelNothingMarkdown, cancelSuccessMarkdown } from './cancel';
import { deleteErrorMarkdown, deleteNothingMarkdown, deleteSuccessMarkdown } from './delete';
import {
  noReposMarkdown,
  ownerRequiredMarkdown,
  repoErrorMarkdown,
  repoFormatMarkdown,
  repoNotExistsMarkdown,
  repoRequiredMarkdown,
  repoSavedMarkdown,
  titleRequiredMarkdown,
} from './repos';

const helpMarkdown = readFileSync(`${__dirname}/help.md`, 'utf8');
const startMarkdown = readFileSync(`${__dirname}/start.md`, 'utf8');
const unsupportedCommandMarkdown = readFileSync(`${__dirname}/unsupportedCommand.md`, 'utf8');

export {
  cancelNothingMarkdown,
  cancelSuccessMarkdown,
  deleteErrorMarkdown,
  deleteNothingMarkdown,
  deleteSuccessMarkdown,
  helpMarkdown,
  noReposMarkdown,
  ownerRequiredMarkdown,
  repoErrorMarkdown,
  repoFormatMarkdown,
  repoNotExistsMarkdown,
  repoRequiredMarkdown,
  repoSavedMarkdown,
  startMarkdown,
  titleRequiredMarkdown,
  unsupportedCommandMarkdown,
};
