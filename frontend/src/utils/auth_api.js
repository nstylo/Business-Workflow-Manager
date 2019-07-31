import axios from 'axios';

// include xsrf token in header
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

// test api url
const test_api_url = 'https://login.free.beeceptor.com';

/**
 * takes username and password and makes a login request
 */
export async function login(username, password) {
  return await axios
    .post(test_api_url, {
      username: username || '',
      password: password || ''
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
}
