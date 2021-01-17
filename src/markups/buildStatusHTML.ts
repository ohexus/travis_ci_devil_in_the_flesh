import { BuildStatuses } from '../enums/BuildStatuses';
import TravisPayload from '../interfaces/TravisPayload';
import formatTime from '../utils/helpers/formatTime';

export default function buildStatusHTML(payload: TravisPayload): string {
  return `
    ${payload.status === BuildStatuses.SUCCESS ? '✅' : '❌'} Build <a href='${payload.build_url}'>#${
    payload.number
  }</a> (<a href='${payload.compare_url}'>${payload.commit.slice(0, 7)}</a>) of ${payload.repository.owner_name}/${
    payload.repository.name
  } on branch ${payload.branch} by ${
    payload.author_name
  } <i>${payload.status_message.toLowerCase()}</i> in a ${formatTime(payload.duration, 'abbreviation')}.
  `;
}
