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
    .min(4, 'username must be at least 6 characters') //temp: 4 -> 6
    .max(16, 'username must be at most 16 characters')
    .required(),
  password: yup
    .string()
    .min(4, 'password must be at least 8 characters') //temp: 4 -> 6
    .max(32, 'password is too long')
    .required()
});

/**
 * LoginForm built from Formik
 */
const LoginForm = props => {
  LoginForm.propTypes = {
    history: PropTypes.object
  };

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    const { history } = props;
    const response = await login(values.username, values.password);

    response.status === 200
      ? history.push('/')
      : setStatus('username and/or password were incorrect') && setSubmitting(false);
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
