//TODO: this is definitly not DRY enough

import axios from 'axios';

// axios headers
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
// postman api key
axios.defaults.headers.common['x-api-key'] =
  process.env.REACT_APP_PSTMN_API_KEY;

/**
 * takes email and password and makes a login request
 * @param {object} values holds the payload of the request
 */
export async function login(values) {
  const { email, password } = values;
  return await axios
    .post('/api/auth/login/', {
      email: email || '',
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
  const { email, password, phone, address, company } = values;
  return await axios
    .post('/api/auth/register/', {
      email: email || '',
      password: password || '',
      phone: phone || '',
      address: address || '',
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
    .post('/api/auth/password/reset/', {
      email: email || ''
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
 * TODO: how to identify which password to update?
 */
export async function reset(values) {
  const { password } = values;
  return await axios
    .put('/api/auth/password/reset/confirm/', {
      password: password || ''
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
}
