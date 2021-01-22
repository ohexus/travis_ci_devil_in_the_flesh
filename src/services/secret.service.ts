import Secret from '../interfaces/entities/Secret';

class SecretService {
  private secrets: Secret[];

  constructor() {
    this.secrets = [];
  }

  addSecret(secret: Secret): void {
    this.secrets.push(secret);
  }

  deleteSecret(owner: Secret['owner'], repoName: Secret['repoName']): void {
    this.secrets = this.secrets.filter((secret) => secret.owner !== owner && secret.repoName !== repoName);
  }

  getSecret(owner: Secret['owner'], repoName: Secret['repoName']): Secret | null {
    return this.secrets.find((secret) => secret.owner === owner && secret.repoName === repoName) || null;
  }
}

export default new SecretService();
