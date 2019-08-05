import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import handleReset from '../../utils/handleSubmit';
import { reset } from '../../utils/auth_api';
import auth_const from '../../utils/auth_const';

import InputField from '../../other/InputField';
import { Button, Icon } from 'antd';

const ResetView = props => {
  const { isSubmitting } = props;
  return (
    <Form>
      <Field
        name="password"
        type="password"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Password"
        component={InputField}
      />
      <Field
        name="passwordConf"
        type="password"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Confirm password"
        component={InputField}
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
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'password must be at least 8 characters')
    .max(256, 'password must be at most 256 characters')
    .required(),
  passwordConf: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match')
});

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({ password: '' }),
  handleSubmit: async (values, options) => {
    await handleReset(reset, auth_const.reset, values, options);
  }
})(ResetView);
