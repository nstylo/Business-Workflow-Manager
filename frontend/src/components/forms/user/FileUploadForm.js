import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import FileUploader from '../../other/FileUploader';
import handlePostFiles from '../../utils/handleSubmit';
import { postFiles } from '../../utils/user_api';
import auth_const from '../../utils/auth_const';

import { Button } from 'antd';

const UploadView = props => {
  const { isSubmitting } = props;
  return (
    <Form>
      <Field
        name="files"
        // prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Upload your files here ..."
        component={FileUploader}
      />
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        disabled={isSubmitting}
      >
        Submit
      </Button>
      <p>{props.errors.default}</p>
    </Form>
  );
};

// define the validation schema for the input fields
const validationSchema = yup.object().shape({});

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({ files: [] }),
  handleSubmit: async (values, options) => {
    await handlePostFiles(postFiles, auth_const.postFiles, values, options);
  }
})(UploadView);
