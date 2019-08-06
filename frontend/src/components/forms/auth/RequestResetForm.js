import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import handleRequestReset from '../../utils/handleSubmit';
import { requestReset } from '../../utils/auth_api';
import auth_const from '../../utils/auth_const';

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
        name="email"
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
  email: yup
    .string()
    .max(254, 'email must be shorter than 254 characters')
    .email('enter a valid email address')
    .required()
});

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({ email: '' }),
  handleSubmit: async (values, options) => {
    await handleRequestReset(
      requestReset,
      auth_const.requestReset,
      values,
      options
    );
  }
})(RequestResetView);
