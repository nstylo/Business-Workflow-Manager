import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import { handleSubmit } from '../../../utils/form_submit';
import form_const from '../../../utils/form_const';

import FileUploader from '../../other/FileUploader';
import InputField from '../../other/InputField';
import TextArea from '../../other/TextArea';
import { Button, Icon, Alert, Form as AntForm } from 'antd';

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
      <Field
        name="title"
        prefix={<Icon type="pushpin" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Your job title ..."
        component={InputField}
      />
      <FormItem>
        <Field
          name="files"
          prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Upload your files here ..."
          component={FileUploader}
        />
      </FormItem>
      <Field
        name="description"
        prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Describe your project ..."
        component={TextArea}
      />
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
      {errors.default ? (
        <FormItem>
          <Alert type="error" message={errors.default} showIcon />
        </FormItem>
      ) : null}
    </Form>
  );
};

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  files: yup.array().required(),
  title: yup.string().required(),
  description: yup.string()
});

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({ files: [], title: '', description: '' }),
  handleSubmit: async (values, options) => {
    await handleSubmit(form_const.postFiles, values, options);
  }
})(UploadView);
