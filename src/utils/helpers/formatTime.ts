export default function formatTime(
  timeInSeconds: number,
  formatWith: 'colon' | 'abbreviation' | 'sec' = 'colon',
): string {
  if (timeInSeconds < 0) {
    return 'Seconds number cannot be negative!';
  }

  const format = (num: number) => ('00' + num).slice(-2);

  const hours = Math.floor(timeInSeconds / 60 / 60) % 60;
  const minutes = Math.floor(timeInSeconds / 60) % 60;
  const seconds = Math.floor(timeInSeconds - minutes * 60);

  if (formatWith === 'colon') {
    return hours > 0
      ? `${format(hours)}:${format(minutes)}:${format(seconds)}`
      : `${format(minutes)}:${format(seconds)}`;
  }

  if (formatWith === 'abbreviation') {
    return `${!!hours ? `${hours} hrs ` : ''}${!!minutes ? `${minutes} min ` : ''}${seconds} sec`;
  }

  return `${seconds} sec`;
}
