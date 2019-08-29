// this file contains constants for form submissions
export default {
  login: {
    redirect_url: '/user/upload/',
    request_url: '/auth/login/',
    status: {
      successful: 200,
      unsuccessful: 400
    }
  },
  register: {
    redirect_url: '/auth/verification-email-sent/',
    request_url: '/auth/register/',
    status: {
      successful: 201,
      unsuccessful: 400
    }
  },
  requestReset: {
    redirect_url: '/auth/request-reset-successful/',
    request_url: '/auth/send-reset-password-link/',
    status: {
      successful: 200,
      unsuccessful: 404
    }
  },
  reset: {
    redirect_url: '/auth/reset-successful/',
    request_url: '/auth/reset-password/',
    status: {
      successful: 200,
      unsuccessful: 400
    }
  },
  postFiles: {
    redirect_url: null,
    request_url: '/jobs/',
    status: {
      successful: 201,
      unsuccessful: 400
    }
  },
  logout: {
    redirect_url: '/auth/login/',
    request_url: '/auth/logout/',
    status: {
      successful: 200,
      unsuccessful: 403
    }
  },
  checkAuthenticated: {
    redirect_url: null,
    request_url: '/auth/logout/',
    status: {
      successful: 405,
      unsuccessful: 403
    }
  },
  default_errors: {
    errors: {
      default: 'something unexpected happened'
    }
  }
};
