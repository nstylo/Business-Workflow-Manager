import axios from 'axios';

// create local instance of axios
const instance = axios.create({
  xsrfHeaderName: 'X-CSRFTOKEN',
  xsrfCookieName: 'csrftoken'
});

/**
 * handles post requests globally
 * @param { string } url the api endpoint of the request
 * @param { object } values the payload of the request
 */
export async function post(url, values) {
  return await instance
    .post(url, values)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    });
}

/**
 * get query parameters for email verification
 * @return { object } json containing user_id, timestamp, signature
 */
export function getQueryParams() {
  let urlParams = new URLSearchParams(window.location.search);
  return {
    user_id: urlParams.get('user_id'),
    timestamp: urlParams.get('timestamp'),
    signature: urlParams.get('signature')
  };
}
