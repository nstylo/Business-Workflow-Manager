// this file just holds information about api calls which should be globally
// used in order to not hardcode those
export default {
  login: {
    url: '/',
    status: {
      successful: 200,
      unsuccessful: 401
    },
    mock_errors: {
      errors: {
        email: 'email is not registered'
      }
    }
  },
  register: {
    url: '/register-successful/',
    status: {
      successful: 200,
      unsuccessful: 400
    },
    mock_errors: {
      errors: {
        email: 'email is already registered'
      }
    }
  },
  requestReset: {
    url: '/request-reset-successful/',
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
  reset: {
    url: 'reset-successful/',
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
