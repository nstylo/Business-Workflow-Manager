import React from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { login } from '../../utils/auth_api';

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'username must be at least 4 characters')
    .max(32, 'username must be at most 32 characters')
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
  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    const { history } = props;
    const { username, password } = values;
    const response = await login(username, password);

    let status;
    switch (response.status) {
      case 200:
        history.push('/');
        return;
      case 401:
        status = 'username and/or password were incorrect';
        break;
      default:
        status = 'something unexpected happened';
    }

    setStatus(status);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ errors, touched, status, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <label>
            <Field type="text" name="username" placeholder="username" />
            {touched.username && errors.username}
          </label>
          <label>
            <Field type="password" name="password" placeholder="password" />
            {touched.password && errors.password}
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

const LoginFormWithRouter = withRouter(LoginForm); // bound react router, to access history
export default LoginFormWithRouter;
