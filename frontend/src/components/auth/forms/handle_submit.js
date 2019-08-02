import auth_const from './auth_const';

export default async function handleSubmit(
  callback, // api callback
  constants, // TODO: dumb name, holds expected status
  props, // props are used for history, so we can route on success
  values, // payload for the api call
  bag // helper formik functions
) {
  const { setErrors, setSubmitting } = bag;
  const { status, url } = constants;
  const { history } = props;
  const response = await callback(values);

  switch (response.status) {
    case status.successful:
      history.push(url); // route
      return;
    case status.unsuccessful:
      setErrors(response.data.errors); // errors for the right label
      break;
    default:
      setErrors(auth_const.default_errors.errors); // error on bottom of form
  }

  setSubmitting(false); // do not disable submit button on failure
}
