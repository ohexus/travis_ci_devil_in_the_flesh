import TravisPayload from '../interfaces/TravisPayload';

export default function buildStatusHTML(payload: TravisPayload): string {
  return `
    ${payload.status ? '✅' : '❌'} Build <a href='${payload.build_url}'>#${payload.number}</a> (<a href='${
    payload.compare_url
  }'>${payload.commit.slice(0, 7)}</a>) of ${payload.repository.owner_name}/${payload.repository.name} on branch ${
    payload.branch
  } by ${payload.author_name} ${payload.status_message} in a ${payload.duration} sec.
  `;
}
