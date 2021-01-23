export interface SecretBasic {
  value: string;
  owner: string;
  repoName: string;
}

export interface Secret extends SecretBasic {
  id: string;
}
