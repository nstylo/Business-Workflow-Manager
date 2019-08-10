import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import { handleSubmit } from '../../../utils/form_submit';
import form_const from '../../../utils/form_const';

import InputField from '../../other/InputField';
import { Button, Icon, Alert, Form as AntForm } from 'antd';

const FormItem = AntForm.Item;

const ResetView = props => {
  const { isSubmitting, errors } = props;
  return (
    <Form className="form-auth">
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
    const queryParams = options.props.getQueryParams(); // get query params
    await handleSubmit(
      form_const.reset,
      { ...values, ...queryParams }, // submit query params and password
      options
    );
  }
})(ResetView);
