import { readFileSync } from 'fs';

const cancelNothingMarkdown = readFileSync(`${__dirname}/cancelNothing.md`, 'utf8');
const cancelSuccessMarkdown = readFileSync(`${__dirname}/cancelSuccess.md`, 'utf8');

export { cancelNothingMarkdown, cancelSuccessMarkdown };
