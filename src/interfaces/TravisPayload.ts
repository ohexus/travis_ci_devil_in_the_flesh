import { BuildStatuses, BuildStatusMessages } from '../enums/BuildStatuses';

export default interface TravisPayload {
  id: number;
  number: string;
  status: BuildStatuses;
  result: BuildStatuses;
  status_message: BuildStatusMessages;
  result_message: BuildStatusMessages;
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
