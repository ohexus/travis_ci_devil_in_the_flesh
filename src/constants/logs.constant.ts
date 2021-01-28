const LOGS = {
  SUCCESS: {
    HTTP: {
      DEFAULT: 'Request completed successfully',
    },
    DB: {
      CONNECTION: 'DB connection established successfully',
    },
    CHAT: {
      ADD: 'Chat added successfully',
      GET_ONE: 'Chat got successfully',
      DELETE: 'Chat deleted successfully',
    },
    NOTIFICATION: {
      SEND: 'Notification send successfully',
    },
    SECRET: {
      STORED: 'Secret stored successfully',
    },
  },
  ERROR: {
    HTTP: {
      DEFAULT: 'Request failed!',
      INVALID_REQUEST: 'Invalid request!',
    },
    DB: {
      CONNECTION: 'Failed DB connection!',
    },
    CHAT: {
      ADD: 'Failed to add chat',
      NOT_FOUND: 'Chat not found!',
      DELETE: 'Failed to delete chat',
    },
    REPO: {
      NOT_FOUND: 'Repo not found!',
      NOT_PROVIDED: 'No repo provided!',
      INVALID_FORMAT: 'Invalid repo format',
      DELETE: 'Failed to delete repo',
    },
    TRAVIS: {
      WRONG_PAYLOAD: 'Wrong payload!',
    },
    NOTIFICATION: {
      SEND: 'Failed to send notification',
    },
    SECRET: {
      NOT_PROVIDED: 'No secret provided!',
      STORED: 'Failed to store secret',
    },
    TITLE: {
      CHANGE: 'Failed to change title',
    },
  },
};

export default LOGS;
