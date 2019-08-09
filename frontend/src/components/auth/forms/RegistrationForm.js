import React from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import handleRegister from './handle_submit';
import { register } from './auth_api';
import auth_const from './auth_const';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
    .required(),
  passwordConf: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'phone number is not valid')
    .required(),
  address: yup.string(),
  company: yup.string()
});

const RegistrationForm = props => {
  RegistrationForm.propTypes = {
    history: PropTypes.object
  };

  const handleSubmit = async (values, options) => {
    await handleRegister(register, auth_const.register, props, values, options);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        phone: '',
        address: '',
        company: ''
      }}
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
          <label>
            <Field
              type="password"
              name="passwordConf"
              placeholder="confirm password"
            />
            {touched.passwordConf && errors.passwordConf}
          </label>
          <label>
            <Field name="phone" placeholder="phone-number" />
            {touched.phone && errors.phone}
          </label>
          <label>
            <Field name="address" placeholder="address" />
            {touched.phone && errors.phone}
          </label>
          <label>
            <Field name="company" placeholder="company" />
            {touched.company && errors.company}
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

const LoginFormWithRouter = withRouter(RegistrationForm); // bound react router, to access history
export default LoginFormWithRouter;
