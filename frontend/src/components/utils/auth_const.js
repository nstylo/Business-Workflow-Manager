// this file just holds information about api calls which should be globally
// used in order to not hardcode those
export default {
  login: {
    url: '/',
    status: {
      successful: 200,
      unsuccessful: 400
    },
    mock_errors: {
      errors: {
        email: 'email is not registered'
      }
    }
  },
  register: {
    url: '/auth/verification-email-sent',
    status: {
      successful: 201,
      unsuccessful: 400
    },
    mock_errors: {
      errors: {
        email: 'email is already registered'
      }
    }
  },
  requestReset: {
    url: '/auth/request-reset-successful',
    status: {
      successful: 200,
      unsuccessful: 404
    },
    mock_errors: {
      errors: {
        email: 'email is not registered'
      }
    }
  },
  reset: {
    url: 'auth/reset-successful/',
    status: {
      successful: 200,
      unsuccessful: 400
    },
    mock_errors: {
      errors: {
        password: 'please enter a valid password'
      }
    }
  },
  postFiles: {
    url: null,
    status: {
      successful: 200,
      unsuccessful: 401
    },
    mock_errors: {
      errors: {
        files: 'uploaded invalid files'
      }
    }
  },
  default_errors: {
    errors: {
      default: 'something unexpected happened'
    }
  }
};
