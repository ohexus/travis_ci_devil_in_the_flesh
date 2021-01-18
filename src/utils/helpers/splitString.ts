import { multipleSpacesRegex } from '../../regexes';

export default function splitString(str: string): string[] {
  return str.trim().replace(multipleSpacesRegex, ' ').split(' ');
}
