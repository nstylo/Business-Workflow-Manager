import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import { handleSubmit } from '../../../utils/form_submit';
import form_const from '../../../utils/form_const';

import InputField from '../../other/InputField';
import { Button, Icon, Alert, Form as AntForm } from 'antd';

const FormItem = AntForm.Item;

const RequestResetView = props => {
  const { isSubmitting, errors } = props;
  return (
    <Form
      style={{
        width: '40%',
        margin: 'auto auto',
        padding: '20px',
        border: 'solid rgba(0,0,0,.25) 1px',
        borderRadius: '5px'
      }}
    >
      <Field
        name="login"
        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Email"
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
          Reset your password now
        </Button>
      </FormItem>
      {errors.detail ? (
        <FormItem>
          <Alert type="error" message={errors.detail} showIcon />
        </FormItem>
      ) : null}
    </Form>
  );
};

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  login: yup
    .string()
    .max(254, 'email must be shorter than 254 characters')
    .email('enter a valid email address')
    .required()
});

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({ login: '' }),
  handleSubmit: async (values, options) => {
    await handleSubmit(form_const.requestReset, values, options);
  }
})(RequestResetView);
