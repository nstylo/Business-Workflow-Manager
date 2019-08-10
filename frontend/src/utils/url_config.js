let BACKEND_URL;
const hostname = window && window.location && window.location.hostname;

if (hostname === '***REMOVED***.ml' || hostname === '***REMOVED***.ga') {
  // production + staging
  BACKEND_URL = `https://${hostname}`;
} else {
  // development
  BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';
}

export const API_URL = `${BACKEND_URL}/api`;
