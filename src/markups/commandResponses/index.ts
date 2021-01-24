import { readFileSync } from 'fs';

import { cancelNothingMarkdown, cancelSuccessMarkdown } from './cancel';
import { deleteErrorMarkdown, deleteNothingMarkdown, deleteSuccessMarkdown } from './delete';
import {
  noReposMarkdown,
  ownerRequiredMarkdown,
  repoErrorMarkdown,
  repoFormatMarkdown,
  repoNotExistsMarkdown,
  repoNotFoundMarkdown,
  repoRequiredMarkdown,
  repoSavedMarkdown,
  repoTrackedMarkdown,
  titleAlreadyUsedMarkdown,
  titleRequiredMarkdown,
} from './repos';
import {
  secretChangeMarkdown,
  secretErrorMarkdown,
  secretFormatHTML,
  secretRequiredMarkdown,
  secretSavedHTML,
} from './secret';

import listHTML from './listHTML';

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
  listHTML,
  noReposMarkdown,
  ownerRequiredMarkdown,
  repoErrorMarkdown,
  repoFormatMarkdown,
  repoNotExistsMarkdown,
  repoNotFoundMarkdown,
  repoRequiredMarkdown,
  repoSavedMarkdown,
  repoTrackedMarkdown,
  secretChangeMarkdown,
  secretErrorMarkdown,
  secretFormatHTML,
  secretRequiredMarkdown,
  secretSavedHTML,
  startMarkdown,
  titleAlreadyUsedMarkdown,
  titleRequiredMarkdown,
  unsupportedCommandMarkdown,
};
