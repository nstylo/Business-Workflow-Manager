import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import FileUploader from '../../other/FileUploader';
import handlePostFiles from '../../utils/handleSubmit';
import { postFiles } from '../../utils/user_api';
import auth_const from '../../utils/auth_const';

import { Button, Form as AntForm } from 'antd';

const FormItem = AntForm.Item;

const UploadView = props => {
  const { isSubmitting, errors } = props;
  return (
    <Form
      style={{
        width: '50%',
        margin: 'auto auto',
        padding: '20px 30px',
        border: 'solid rgba(0,0,0,.25) 1px',
        borderRadius: '5px'
      }}
    >
      <FormItem>
        <Field
          name="files"
          // prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Upload your files here ..."
          component={FileUploader}
        />
      </FormItem>
      <FormItem>
        <Button
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </FormItem>
      <FormItem
        help={errors.default}
        validateStatus={errors.default ? 'error' : null}
      />
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
