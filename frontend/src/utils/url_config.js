let BACKEND_URL;
const hostname = window && window.location && window.location.hostname;

export const localHosts = ['localhost', '127.0.0.1'];

if (localHosts.includes(hostname)) {
  // development
  // CAREFUL: env vars do parse to strings, so initializing to null will yield
  // a string which is NOT falsely
  BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';
} else {
  // production and staging
  BACKEND_URL = `https://${hostname}`;
}

export const API_URL = `${BACKEND_URL}/api`;
