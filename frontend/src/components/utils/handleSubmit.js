import auth_const from './auth_const';
import history from '../../history';

/**
 * This interface requires a api request callback and 'instructions'
 * on how to handle those depending on status codes
 * @param {function} callback the api callback on submission
 * @param {object} constants holds status codes and route url on success
 * @param {object} values the payload of the api call
 * @param {object} bag formik helper functions
 */
export default async function handleSubmit(callback, constants, values, bag) {
  const { setErrors, setSubmitting, resetForm } = bag;
  const { status, url } = constants;
  const response = await callback(values);

  console.log(response);

  switch (response.status) {
    case status.successful:
      resetForm();
      history.push(url); // route
      return;
    case status.unsuccessful:
      setErrors(response.data); // errors for the right label
      break;
    default:
      setErrors(auth_const.default_errors.errors); // error on bottom of form
  }

  setSubmitting(false); // do not disable submit button on failure
}
