import React from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { requestReset } from '../../utils/auth_api';

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .max(254, 'email must be shorter than 254 characters')
    .email('enter a valid email address')
    .required()
});

/**
 * This form handles password reset
 */
export const handleRequestReset = async (props, values, { setErrors, setSubmitting }) => {
  const { history } = props;
  const { email } = values;
  const response = await requestReset(email);

  let errors;
  switch (response.data.status_code) {
    case 200:
      history.push('/request-reset-successful'); // TODO: routing is not final
      return;
    case 404:
      errors = response.data.content.errors; // TODO: might have a different name
      break;
    default:
      errors = { default: 'something unexpected happened' };
  }

  setErrors(errors);
  setSubmitting(false);
};

const LoginForm = props => {
  LoginForm.propTypes = {
    history: PropTypes.object
  };

  const handleSubmit = async (values, options) => {
    await handleRequestReset(props, values, options);
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
