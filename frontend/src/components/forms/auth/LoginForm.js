import React from 'react';
import { withFormik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import handleLogin from '../../utils/handleSubmit';
import { login } from '../../utils/auth_api';
import auth_const from '../../utils/auth_const';

import InputField from '../../other/InputField';
import { Button, Icon, Checkbox, Form as AntForm } from 'antd';
const FormItem = AntForm.Item;

const LoginView = props => {
  const { isSubmitting } = props;
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
      <Field
        name="password"
        type="password"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Password"
        component={InputField}
      />
      <FormItem>
        <span>
          <Checkbox>Remember me</Checkbox>
          <Link style={{ float: 'right' }} to="/auth/request-reset/">
            Forgot Password
          </Link>
        </span>
        <Button
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={isSubmitting}
        >
          Log in
        </Button>
        Or <Link to="/auth/register">register now!</Link>
      </FormItem>
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
    .required(),
  password: yup
    .string()
    .min(8, 'password must be at least 8 characters')
    .max(256, 'password must be at most 256 characters')
    .required()
});

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({ email: '', password: '' }),
  handleSubmit: async (values, options) => {
    await handleLogin(login, auth_const.login, values, options);
  }
})(LoginView);
