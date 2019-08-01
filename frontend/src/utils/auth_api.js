import axios from 'axios';

// include xsrf token in header
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

// test api url
const test_api_url = 'https://autho.free.beeceptor.com';

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
