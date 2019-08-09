import React from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import handleRequestReset from './handle_submit';
import { requestReset } from './auth_api';
import auth_const from './auth_const';

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .max(254, 'email must be shorter than 254 characters')
    .email('enter a valid email address')
    .required()
});

const LoginForm = props => {
  LoginForm.propTypes = {
    history: PropTypes.object
  };

  const handleSubmit = async (values, options) => {
    await handleRequestReset(
      requestReset,
      auth_const.requestReset,
      props,
      values,
      options
    );
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ errors, touched, status, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <label>
            <Field name="email" placeholder="email" />
            {touched.email && errors.email}
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
