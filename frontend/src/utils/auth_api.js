import axios from 'axios';

// include xsrf token in header
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

// test api url
const test_api_url = 'http://127.0.0.1:8000';

/**
 * takes email and password and makes a login request
 */
export async function login(email, password) {
  return await axios
    .post(test_api_url, {
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
 */
export async function register(email, username, password, phone, address, company) {
  return await axios
    .post(test_api_url, {
      email: email || '',
      username: username || '',
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
 */
export async function requestReset(email) {
  return await axios
    .post(test_api_url, {
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
 * TODO: how to identify which password to update?
 */
export async function reset(password) {
  return await axios
    .patch(test_api_url, {
      email: password || ''
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
}
