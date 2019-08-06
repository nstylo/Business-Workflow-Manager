import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import handleRegister from '../../utils/handleSubmit';
import { register } from '../../utils/auth_api';
import auth_const from '../../utils/auth_const';

import CountrySelector from '../../other/CountrySelector';
import countryList from 'react-select-country-list';
import InputField from '../../other/InputField';
import CheckBox from '../../other/CheckBox';
import { Button, Icon, Form as AntForm } from 'antd';

const FormItem = AntForm.Item;
const countries = countryList();

const RegistrationView = props => {
  const { isSubmitting, touched, errors } = props;
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
      <FormItem
        help={touched.conditions && errors.conditions}
        validateStatus={errors.conditions ? 'error' : null}
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
      <FormItem
        help={errors.default}
        validateStatus={errors.default ? 'error' : null}
      />
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
    phone: '',
    address: '',
    country: '',
    company: '',
    conditions: false
  }),
  handleSubmit: async (values, options) => {
    await handleRegister(register, auth_const.register, values, options);
  }
})(RegistrationView);
