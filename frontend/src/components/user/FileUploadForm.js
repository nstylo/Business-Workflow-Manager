import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import FileUploader from './FileUploader';

import handlePostFiles from '../auth/forms/handle_submit';
import { postFiles } from './user_api';
import auth_const from '../auth/forms/auth_const';

// define the validation schema for the input fields
const validationSchema = yup.object().shape({});

const LoginForm = props => {
  LoginForm.propTypes = {
    history: PropTypes.object
  };

  const handleSubmit = async (values, options) => {
    await handlePostFiles(
      postFiles,
      auth_const.postFiles,
      props,
      values,
      options
    );
  };

  return (
    <Formik
      initialValues={{ files: [] }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ errors, touched, status, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <label>
            <Field name="files" component={FileUploader} />
            {touched.files && errors.files}
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
