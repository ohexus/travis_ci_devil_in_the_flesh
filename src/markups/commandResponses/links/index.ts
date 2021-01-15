import { readFileSync } from 'fs';

const linkErrorMarkdown = readFileSync(`${__dirname}/linkError.md`, 'utf8');
const linkFormatMarkdown = readFileSync(`${__dirname}/linkFormat.md`, 'utf8');
const linkRequiredMarkdown = readFileSync(`${__dirname}/linkRequired.md`, 'utf8');
const linkSuccessMarkdown = readFileSync(`${__dirname}/linkSuccess.md`, 'utf8');
const linkWrongMarkdown = readFileSync(`${__dirname}/linkWrong.md`, 'utf8');

export { linkErrorMarkdown, linkFormatMarkdown, linkRequiredMarkdown, linkSuccessMarkdown, linkWrongMarkdown };
