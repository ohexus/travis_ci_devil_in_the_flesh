import { appUrlNotify } from '../../../constants';

export default function secretSavedHTML(secret: string): string {
  return `Secret saved successfully!
  
Add the next code to your <i>.travis.yml</i> to start receive notifications:
  
<code>notifications:
  webhooks: ${appUrlNotify}${secret}</code>`;
}
