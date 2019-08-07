import axios from 'axios';

// axios headers
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

/**
 * handles post requests globally
 * @param { string } url the api endpoint of the request
 * @param { object } values the payload of the request
 */
export async function post(url, values) {
  return await axios
    .post(url, values)
    .then(response => {
      return response;
    })
    .catch(err => {
      // .response .request .message are defined by axios
      if (err.response) {
        // if axios returned status =/= 2xx
        return err.response;
      }
      if (err.request) {
        // request was made but nothing received
        return err.request;
      }
      return err.message; // something went wrong with setting up the request
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

// for testing reasons
export default { post, getQueryParams };
