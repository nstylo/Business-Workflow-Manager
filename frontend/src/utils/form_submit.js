import form_const from './form_const';
import { post } from './requests';

/**
 * This interface requires an api request callback and 'instructions'
 * on how to handle those depending on status codes
 * @param {object} constants holds status codes and route url on success
 * @param {object} values the payload of the api call
 * @param {object} bag formik helper functions
 */
export async function handleSubmit(constants, values, bag) {
  const { setErrors, setSubmitting, resetForm } = bag;
  const { status, request_url } = constants;

  const response = await post(request_url, values); // make request

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
      setErrors(form_const.default_errors.errors);
      setSubmitting(false); // enable submit button on failure
  }
  return response;
}
