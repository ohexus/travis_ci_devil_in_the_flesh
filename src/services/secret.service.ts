import { v4 as uuid } from 'uuid';

import { secretAutoDeleteTimeout } from '../constants';

import { Secret, SecretBasic } from '../interfaces/entities/Secret';

class SecretService {
  private secrets: Secret[];

  constructor() {
    this.secrets = [];
  }

  addSecret(secretObj: SecretBasic): void {
    const secret = { ...secretObj, id: uuid() };

    this.secrets.push(secret);

    this.autoDelete(secret.id);
  }

  deleteSecret(id: Secret['id']): void {
    this.secrets = this.secrets.filter((secret) => secret.id !== id);
  }

  getSecret(owner: Secret['owner'], repoName: Secret['repoName']): Secret | null {
    return this.secrets.find((secret) => secret.owner === owner && secret.repoName === repoName) || null;
  }

  autoDelete(id: Secret['id']): void {
    setTimeout(() => this.deleteSecret(id), secretAutoDeleteTimeout);
  }
}

export default new SecretService();
