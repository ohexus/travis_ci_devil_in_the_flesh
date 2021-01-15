import { multipleSpaces } from '../../regexps';

export default function splitString(str: string): string[] {
  return str.trim().replace(multipleSpaces, ' ').split(' ');
}
