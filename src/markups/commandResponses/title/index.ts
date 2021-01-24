import { readFileSync } from 'fs';

const titleAlreadyUsedMarkdown = readFileSync(`${__dirname}/titleAlreadyUsed.md`, 'utf8');
const titleChangeErrorMarkdown = readFileSync(`${__dirname}/titleChangeError.md`, 'utf8');
const titleChangeFormatMarkdown = readFileSync(`${__dirname}/titleChangeFormat.md`, 'utf8');
const titleChangeSuccessMarkdown = readFileSync(`${__dirname}/titleChangeSuccess.md`, 'utf8');
const titleRequiredMarkdown = readFileSync(`${__dirname}/titleRequired.md`, 'utf8');

export {
  titleAlreadyUsedMarkdown,
  titleChangeErrorMarkdown,
  titleChangeFormatMarkdown,
  titleChangeSuccessMarkdown,
  titleRequiredMarkdown,
};
