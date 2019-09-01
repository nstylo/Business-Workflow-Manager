import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import { handleSubmit } from '../../../utils/requests';
import FORM_CONST from '../../../utils/form_const';

import InputField from '../../other/InputField';
import { Button, Icon, Alert, Form as AntForm } from 'antd';

const FormItem = AntForm.Item;

const ChangePasswordView = props => {
  const { isSubmitting, errors } = props;
  return (
    <Form
      style={{
        width: '90%',
        margin: 'auto'
      }}
    >
      <Field
        name="current"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Your current password ... "
        component={InputField}
      />
      <Field
        name="new"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Your new password ..."
        component={InputField}
      />
      <Field
        name="newConfirm"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Confirm your new password ..."
        component={InputField}
      />
      <FormItem>
        <Button
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={isSubmitting}
        >
          Update password
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
  current: yup
    .string()
    .min(8, 'password must be at least 8 characters')
    .max(256, 'password must be at most 256 characters')
    .required(),
  new: yup
    .string()
    .min(8, 'password must be at least 8 characters')
    .max(256, 'password must be at most 256 characters')
    .required(),
  newConfirm: yup
    .string()
    .min(8, 'password must be at least 8 characters')
    .max(256, 'password must be at most 256 characters')
    .required()
});

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({ current: '', new: '', newConfirm: '' }),
  handleSubmit: async (values, bag) => {
    // await handleSubmit(FORM_CONST.postFiles, {}, bag, {});
  }
})(ChangePasswordView);
