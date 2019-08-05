import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import handleRequestReset from '../../utils/handleSubmit';
import { requestReset } from '../../utils/auth_api';
import auth_const from '../../utils/auth_const';

import { InputField } from './FormItems';
import { Button, Icon } from 'antd';

const RequestResetView = props => {
  return (
    <Form>
      <Field
        name="email"
        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Email"
        component={InputField}
      />
      <Button type="primary" htmlType="submit" className="login-form-button">
        Submit
      </Button>
      <p>{props.errors.default}</p>
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
