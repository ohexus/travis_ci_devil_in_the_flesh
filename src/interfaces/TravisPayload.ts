export default interface TravisPayload {
  id: number;
  number: string;
  status: 0 | 1;
  result: 0 | 1;
  status_message: 'Passed' | 'Errored';
  result_message: 'Passed' | 'Errored';
  started_at: string;
  finished_at: string;
  duration: number;
  build_url: string;
  commit: string;
  branch: string;
  message: string;
  compare_url: string;
  author_name: string;
  repository: {
    id: number;
    name: string;
    owner_name: string;
    url: string;
  };
}
