import React from 'react';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import handleLogin from '../../utils/handleSubmit';
import { login } from '../../utils/auth_api';
import auth_const from '../../utils/auth_const';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .max(254, 'email must be shorter than 254 characters')
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

  const handleSubmit = async (values, options) => {
    await handleLogin(login, auth_const.login, props, values, options);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ errors, touched, status, handleSubmit, isSubmitting }) => (
        <FormikForm onSubmit={handleSubmit}>
          <label>
            <FormikField name="email" placeholder="email" />
            {touched.email && errors.email}
          </label>
          <label>
            <FormikField
              type="password"
              name="password"
              placeholder="password"
            />
            {touched.password && errors.password}
          </label>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <p>{errors.default}</p>
        </FormikForm>
      )}
    />
  );
};

const LoginFormWithRouter = withRouter(LoginForm); // bound react router, to access history
export default LoginFormWithRouter;
