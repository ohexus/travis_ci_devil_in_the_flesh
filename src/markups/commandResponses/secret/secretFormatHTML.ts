export default function secretFormatHTML(showNote: boolean = true): string {
  return `Please write a secret for the repo to make sure that only you will receive notifications:
<i><b>&lt;your_secret_variable&gt;</b></i>
  
You can cancel this command by typing /cancel\.
${
  showNote
    ? 'Please note: if you cancel this command or call another, the repository will be deleted from the bot!'
    : ''
}`;
}
