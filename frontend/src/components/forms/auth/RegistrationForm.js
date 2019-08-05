import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import handleRegister from '../../utils/handleSubmit';
import { register } from '../../utils/auth_api';
import auth_const from '../../utils/auth_const';

import CountrySelector from '../../other/CountrySelector';
import countryList from 'react-select-country-list';
import InputField from '../../other/InputField';
import { Button, Icon } from 'antd';

const countries = countryList();

const RegistrationView = props => {
  const { isSubmitting } = props;
  return (
    <Form>
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
        name="passwordConf"
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
        component={CountrySelector}
      />
      <Field name="company" placeholder="Company" component={InputField} />
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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
  passwordConf: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'phone number is not valid')
    .required(),
  address: yup.string(),
  country: yup.string().required(),
  company: yup.string()
});

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({
    email: '',
    password: '',
    phone: '',
    address: '',
    country: '',
    company: ''
  }),
  handleSubmit: async (values, options) => {
    await handleRegister(register, auth_const.register, values, options);
  }
})(RegistrationView);
