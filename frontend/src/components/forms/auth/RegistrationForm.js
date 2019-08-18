import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { handleSubmit } from '../../../utils/requests';
import FORM_CONST from '../../../utils/form_const';
import history from '../../../history';

import Selector from '../../other/Selector';
import countryList from 'react-select-country-list'; // country data
import InputField from '../../other/InputField';
import CheckBox from '../../other/CheckBox';
import { Button, Icon, Alert, Form as AntForm } from 'antd';

const FormItem = AntForm.Item;
const countries = countryList(); // country data

const RegistrationView = props => {
  const { isSubmitting, touched, errors } = props;
  return (
    <Form className="form-auth">
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
      <Field
        name="password_confirm"
        type="password"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Confirm your password"
        component={InputField}
      />
      <Field
        name="phone"
        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Phone"
        component={InputField}
      />
      <Field
        name="address"
        prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Address"
        component={InputField}
      />
      <Field
        name="country"
        placeholder="Select your country"
        options={countries}
        component={Selector}
      />
      <Field name="company" placeholder="Company" component={InputField} />
      <FormItem
        help={touched.conditions && errors.conditions}
        validateStatus="error"
      >
        <Field name="conditions" type="checkbox" component={CheckBox}>
          I have read the
        </Field>
        <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
        <Button
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={isSubmitting}
        >
          Register now
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
  email: yup
    .string()
    .max(254, 'email must be shorter than 254 characters')
    .email('enter a valid email address')
    .required(),
  password: yup
    .string()
    .min(8, 'password must be at least 8 characters')
    .max(256, 'password must be at most 256 characters')
    .required(),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match'),
  phone: yup.string().required(),
  address: yup.string(),
  country: yup.string().required(),
  company: yup.string(),
  conditions: yup
    .bool()
    .oneOf([true], 'You must agree with the Terms & Conditions')
});

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({
    email: '',
    password: '',
    password_confirm: '',
    phone: '',
    address: '',
    country: '',
    company: '',
    conditions: false
  }),
  handleSubmit: async (values, options) => {
    await handleSubmit(FORM_CONST.register, values, options).then(response => {
      if (response.status === FORM_CONST.register.status.successful) {
        history.push(FORM_CONST.register.redirect_url);
      }
    });
  }
})(RegistrationView);
