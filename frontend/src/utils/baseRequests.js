import axios from 'axios';
import { API_URL } from './url_config';

// TODO: dont make global settings for axios
// axios headers
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;

/**
 * handles post requests globally
 * @param { string } url the api endpoint of the request
 * @param { object } values the payload of the request
 * @param { object } [headers] the payload of the request
 */
export async function post(url, values, config = {}) {
  return await axios
    .post(url, values, config)
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
 * handles get requests globally
 * @param { string } url the api endpoint of the request
 */
export async function get(url, config = {}) {
  return await axios
    .get(url, config)
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
 * handles put requests globally
 * @param { string } url the api endpoint of the request
 */
export async function patch(url, values, config = {}) {
  return await axios
    .patch(url, values, config)
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

export default { get, post, patch };
