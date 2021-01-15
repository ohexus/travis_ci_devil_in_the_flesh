import { readFileSync } from 'fs';

const deleteErrorMarkdown = readFileSync(`${__dirname}/deleteError.md`, 'utf8');
const deleteSuccessMarkdown = readFileSync(`${__dirname}/deleteSuccess.md`, 'utf8');

export { deleteErrorMarkdown, deleteSuccessMarkdown };
