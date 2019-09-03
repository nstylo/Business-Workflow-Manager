import FORM_CONST from './form_const';
import { post, get } from './baseRequests';

/**
 * This function handles standard form submits, i.e. post requests with
 * standard behavior
 * @param {object} constants holds status codes and route url on success
 * @param {object} values the payload of the api call
 * @param {object} bag formik helper functions
 * @param {object} config axios config
 */
export async function handleSubmit(constants, values, bag, config = {}) {
  const { setErrors, setSubmitting, resetForm } = bag;
  const { status, request_url } = constants;

  const response = await post(request_url, values, config); // make request

  // .status .data defined by axios
  switch (response.status) {
    case status.successful:
      resetForm();
      break;
    case status.unsuccessful:
      setErrors(response.data); // errors for the right label
      setSubmitting(false); // enable submit button on failure
      break;
    default:
      // set default errors if unexpected event
      setErrors(FORM_CONST.default_errors.errors);
      setSubmitting(false); // enable submit button on failure
  }
  return response;
}

/**
 * logs out the user and then reroutes to login page
 * TODO: handle error, for now just always redirect even if logout unsuccessful
 */
export async function logout() {
  await post(FORM_CONST.logout.request_url, { revoke_token: true }).catch(
    () => {}
  );
}

/**
 * queries the backend if user authenticated
 * @return { boolean } whether user is logged in
 */
export async function checkAuthenticated() {
  return await get('/auth/logout/')
    .then(response => {
      if (response.status === FORM_CONST.checkAuthenticated.status.successful) {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => false);
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
export default { handleSubmit, logout, checkAuthenticated, getQueryParams };
