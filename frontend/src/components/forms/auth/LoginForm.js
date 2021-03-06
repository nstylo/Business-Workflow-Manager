import React from 'react';
import { withFormik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import history from '../../../history';
import { handleSubmit } from '../../../utils/requests';
import FORM_CONST from '../../../utils/form_const';

import InputField from '../../other/InputField';
import CheckBox from '../../other/CheckBox';
import { Button, Icon, Alert, Form as AntForm } from 'antd';

const FormItem = AntForm.Item;

const LoginView = props => {
  const { isSubmitting, errors } = props;
  return (
    <Form className="form-auth">
      <Field
        name="login"
        className="form-input"
        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Email"
        component={InputField}
      />
      <Field
        name="password"
        className="form-input"
        type="password"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Password"
        component={InputField}
      />
      {/* TODO: include remember me functionality */}
      <Field name="remember" component={CheckBox}>
        Remember me!
        <Link style={{ float: 'right' }} to="/auth/request-reset/">
          Forgot Password
        </Link>
        <Button
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          className="form-button"
          disabled={isSubmitting}
        >
          Log in
        </Button>
        Or <Link to="/auth/register/">register now!</Link>
      </Field>
      {errors.detail ? (
        <FormItem>
          <Alert type="error" message={errors.detail} showIcon />
        </FormItem>
      ) : null}
    </Form>
  );
};

const validationSchema = yup.object().shape({
  login: yup
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
  mapPropsToValues: () => ({ login: '', password: '' }),
  handleSubmit: async (values, bag) => {
    await handleSubmit(FORM_CONST.login, values, bag).then(response => {
      if (response.status === FORM_CONST.login.status.successful) {
        bag.props.setAuthenticated(true); // set global login state
        history.push(FORM_CONST.login.redirect_url); // redirect
      }
    });
  }
})(LoginView);
