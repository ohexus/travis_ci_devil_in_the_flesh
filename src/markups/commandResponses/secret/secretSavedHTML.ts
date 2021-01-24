import { appUrl } from '../../../constants';

export default function secretSavedHTML(secret: string): string {
  return `Secret saved successfully!

Add the following code to your <i>.travis.yml</i> to start receive notifications:

<code>notifications:
  webhooks: ${appUrl.notify}?secret=${secret}</code>


Or another way (and also more secure) is to add a variable to travis environment variables and then add the following code to your <i>.travis.yml</i>:

<code>after_deploy:
  - curl -X POST ${appUrl.secret} -d "repository=$TRAVIS_REPO_SLUG&secret=$&lt;your_variable_name&gt;"
notifications:
  webhooks: ${appUrl.notify}</code>`;
}
