//TODO: this is definitly not DRY enough

import axios from 'axios';

// axios headers
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

/**
 * takes email and password and makes a login request
 * @param {object} values holds the payload of the request
 */
export async function login(values) {
  const { email, password } = values;
  return await axios
    .post('/api/auth/login/', {
      login: email || '', // fieldname 'login' required by django auth framework
      password: password || ''
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
}

/**
 * takes user credentials and makes a registration request
 * @param {object} values holds the payload of the request
 */
export async function register(values) {
  const {
    email,
    password,
    password_confirm,
    phone,
    address,
    country,
    company
  } = values;
  return await axios
    .post('/api/auth/register/', {
      email: email || '',
      password: password || '',
      password_confirm: password_confirm || '',
      phone: phone || '',
      address: address || '',
      country: country || '',
      company: company || ''
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
}

/**
 * takes email to request a password reset
 * @param {object} values holds the payload of the request
 */
export async function requestReset(values) {
  const { email } = values;
  return await axios
    .post('/api/auth/send-reset-password-link/', {
      login: email || ''
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
}

/**
 * takes password to update the current one
 * @param {object} values holds the payload of the request
 */
export async function reset(values) {
  return await axios
    .post('/api/auth/reset-password/', values)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
}

/**
 * takes url and and sends verification payload from server
 * @param { string } url endpoint for verification payload
 */
export async function sendVerify(url, payload) {
  const ur = '/api/auth/verify-registration/';
  return await axios
    .post(url, payload)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
}

export function getQueryParams() {
  let urlParams = new URLSearchParams(window.location.search);
  return {
    user_id: urlParams.get('user_id'),
    timestamp: urlParams.get('timestamp'),
    signature: urlParams.get('signature')
  };
}
