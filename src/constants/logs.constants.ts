const LOGS = {
  SUCCESS: {
    HTTP: {
      DEFAULT: 'Request completed successfully',
    },
    DB: {
      CONNECTION: 'DB connection established successfully',
    },
    USER: {
      ADD: 'User added successfully',
      GET_ONE: 'User got successfully',
      DELETE: 'User deleted successfully',
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
    USER: {
      ADD: 'Failed to add user',
      NOT_FOUND: 'User not found!',
      DELETE: 'Failed to delete user',
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
