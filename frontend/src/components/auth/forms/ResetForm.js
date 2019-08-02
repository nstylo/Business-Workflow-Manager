import React from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { handleReset } from './handle_submit';

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'password must be at least 8 characters')
    .max(256, 'password must be at most 256 characters')
    .required(),
  passwordConf: yup.string().oneOf([yup.ref('password'), null], 'passwords must match')
});

const LoginForm = props => {
  LoginForm.propTypes = {
    history: PropTypes.object
  };

  const handleSubmit = async (values, options) => {
    await handleReset(props, values, options);
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ errors, touched, status, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <label>
            <Field type="password" name="password" placeholder="password" />
            {touched.password && errors.password}
          </label>
          <label>
            <Field type="password" name="passwordConf" placeholder="confirm password" />
            {touched.passwordConf && errors.passwordConf}
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
