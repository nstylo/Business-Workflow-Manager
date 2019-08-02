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
    url: '/register-successful',
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
    url: '/request-reset-successful',
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
  reset: {
    url: 'reset-successful',
    status: {
      successful: 200,
      unsuccessful: 401
    },
    mock_errors: {
      errors: {
        password: 'please enter a valid password'
      }
    }
  },
  default_errors: {
    errors: {
      default: 'something unexpected happened'
    }
  }
};
