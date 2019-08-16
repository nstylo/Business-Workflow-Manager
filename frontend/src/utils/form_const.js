// this file contains constants for form submissions
export default {
  login: {
    redirect_url: '/user/',
    request_url: '/auth/login/',
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
    redirect_url: '/auth/verification-email-sent/',
    request_url: '/auth/register/',
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
    redirect_url: '/auth/request-reset-successful/',
    request_url: '/auth/send-reset-password-link/',
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
    redirect_url: '/auth/reset-successful/',
    request_url: '/auth/reset-password/',
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
    redirect_url: null,
    request_url: '/jobs/',
    status: {
      successful: 201,
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
