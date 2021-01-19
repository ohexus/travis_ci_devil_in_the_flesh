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
    },
    TRAVIS: {
      WRONG_PAYLOAD: 'Wrong payload!',
    },
    NOTIFICATION: {
      SEND: 'Failed to send notification',
    },
  },
};

export default LOGS;
