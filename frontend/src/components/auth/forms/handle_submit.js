// import { login, register, requestReset, reset } from './auth_api';
import auth_const from './auth_const';

export default async function handleSubmit(
  callback,
  constants, // TODO: dumb name
  props,
  values,
  bag
) {
  const { setErrors, setSubmitting } = bag;
  const { status, url } = constants;
  const { history } = props;
  const response = await callback(values);

  switch (response.status) {
    case status.successful:
      history.push(url);
      return;
    case status.unsuccessful:
      setErrors(response.data.errors);
      break;
    default:
      setErrors(auth_const.default_errors.errors);
  }

  setSubmitting(false);
}

// export const handleLogin = async (
//   props,
//   values,
//   { setErrors, setSubmitting }
// ) => {
//   const { history } = props;
//   const { email, password } = values;
//   const response = await login(email, password);
//
//   let errors;
//   switch (response.status) {
//     case auth_const.login.status.successful:
//       history.push(auth_const.login.url);
//       return;
//     case auth_const.login.status.unsuccessful:
//       errors = response.data.errors;
//       break;
//     default:
//       errors = auth_const.default_errors.errors;
//   }
//
//   setErrors(errors);
//   setSubmitting(false);
// };
//
// export const handleRegister = async (
//   props,
//   values,
//   { setStatus, setErrors, setSubmitting }
// ) => {
//   const { history } = props;
//   const { email, username, password, phone, address, company } = values;
//   const response = await register(
//     email,
//     username,
//     password,
//     phone,
//     address,
//     company
//   );
//
//   let errors;
//   switch (response.status) {
//     case auth_const.register.status.successful:
//       history.push(auth_const.register.url);
//       return;
//     case auth_const.register.status.unsuccessful:
//       errors = response.data.errors;
//       break;
//     default:
//       errors = auth_const.default_errors.errors;
//   }
//
//   setErrors(errors);
//   setSubmitting(false);
// };
//
// export const handleRequestReset = async (
//   props,
//   values,
//   { setErrors, setSubmitting }
// ) => {
//   const { history } = props;
//   const { email } = values;
//   const response = await requestReset(email);
//
//   let errors;
//   switch (response.status) {
//     case auth_const.requestReset.status.successful:
//       history.push(auth_const.requestReset.url);
//       return;
//     case auth_const.requestReset.status.unsuccessful:
//       errors = response.data.errors;
//       break;
//     default:
//       errors = auth_const.default_errors.errors;
//   }
//
//   setErrors(errors);
//   setSubmitting(false);
// };
//
// export const handleReset = async (
//   props,
//   values,
//   { setErrors, setSubmitting }
// ) => {
//   const { history } = props;
//   const { password } = values;
//   const response = await reset(password);
//
//   let errors;
//   switch (response.status) {
//     case auth_const.reset.status.successful:
//       history.push(auth_const.reset.url);
//       return;
//     case auth_const.reset.status.unsuccessful:
//       errors = response.data.errors;
//       break;
//     default:
//       errors = auth_const.default_errors.errors;
//   }
//
//   setErrors(errors);
//   setSubmitting(false);
// };
