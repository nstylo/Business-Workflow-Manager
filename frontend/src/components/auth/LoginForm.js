import React from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { login } from '../../utils/auth_api';

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('enter a valid email address')
    .required(),
  password: yup
    .string()
    .min(8, 'password must be at least 8 characters')
    .max(256, 'password must be at most 256 characters')
    .required()
});

const LoginForm = props => {
  LoginForm.propTypes = {
    history: PropTypes.object
  };

  /**
   * Tries to login the user, if response is 200, reroute to root (TODO: change to user-space), else print status to
   * user and enable the submit button
   */
  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    const { history } = props;
    const { email, password } = values;
    const response = await login(email, password);

    let errors;
    switch (response.status) {
      case 200:
        history.push('/');
        return;
      case 401:
        errors = response.data.errors; // TODO: might have a different name
        break;
      default:
        errors = { default: 'something unexpected happened' };
    }

    setErrors(errors);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ errors, touched, status, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <label>
            <Field name="email" placeholder="email" />
            {touched.email && errors.email}
          </label>
          <label>
            <Field type="password" name="password" placeholder="password" />
            {touched.password && errors.password}
          </label>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <p>{errors.default}</p>
        </Form>
      )}
    />
  );
};

const LoginFormWithRouter = withRouter(LoginForm); // bound react router, to access history
export default LoginFormWithRouter;
