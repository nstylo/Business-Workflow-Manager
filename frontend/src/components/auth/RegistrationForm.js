import React from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { register } from '../../utils/auth_api';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('enter a valid email')
    .required(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'phone number is not valid')
    .required(),
  username: yup
    .string()
    .min(4, 'username must be at least 4 characters')
    .max(32, 'username must be at most 32 characters')
    .required(),
  password: yup
    .string()
    .min(8, 'password must be at least 8 characters')
    .max(256, 'password must be at most 256 characters')
    .required(),
  passwordConf: yup.string().oneOf([yup.ref('password'), null], 'passwords must match'),
  companyName: yup.string()
});

const RegistrationForm = props => {
  RegistrationForm.propTypes = {
    history: PropTypes.object
  };

  /**
   * Tries to register the user, if response is 200, reroute to login, else print status to
   * user and enable the submit button
   */
  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    const { history } = props;
    const { email, phone, username, password, companyName } = values;
    const response = await register(email, phone, username, password, companyName);

    let status;
    switch (response.status) {
      case 201:
        history.push('/login');
        return;
      case 409:
        status = 'The email address already exists';
        break;
      case 400:
        // TODO: get response.messages and set error messages for input fields accordingly
        break;
      default:
        status = 'something unexpected happened';
    }

    setStatus(status);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '', phone: '', username: '', password: '', companyName: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ errors, touched, status, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <label>
            <Field name="email" placeholder="email" />
            {touched.email && errors.email}
          </label>
          <label>
            <Field name="phone" placeholder="phone-number" />
            {touched.phone && errors.phone}
          </label>
          <label>
            <Field name="username" placeholder="username" />
            {touched.username && errors.username}
          </label>
          <label>
            <Field type="password" name="password" placeholder="password" />
            {touched.password && errors.password}
          </label>
          <label>
            <Field type="password" name="passwordConf" placeholder="repeat password" />
            {touched.passwordConf && errors.passwordConf}
          </label>
          <label>
            <Field name="companyName" placeholder="company" />
            {touched.companyName && errors.companyName}
          </label>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <p>{status}</p>
        </Form>
      )}
    />
  );
};

const LoginFormWithRouter = withRouter(RegistrationForm); // bound react router, to access history
export default LoginFormWithRouter;
