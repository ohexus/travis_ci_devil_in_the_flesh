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
    LINK: {
      NOT_FOUND: 'Link not found!',
    },
  },
};

export default LOGS;
