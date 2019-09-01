import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import { get, patch } from '../../../utils/baseRequests';
import FORM_CONST from '../../../utils/form_const';

import Selector from '../../other/Selector';
import countryList from 'react-select-country-list'; // country data
import InputField from '../../other/InputField';
import { Button, Icon, Alert, Form as AntForm } from 'antd';

const FormItem = AntForm.Item;
const countries = countryList(); // country data

export default () => {
  const [initialValues, setInitialValues] = useState(null);

  /**
   * fetches profile data on mount and sets initial form values
   */
  useEffect(() => {
    const getInitialValues = async () => {
      await get('/auth/profile/').then(response =>
        setInitialValues(response.data)
      );
    };

    getInitialValues();
  }, []);

  if (initialValues) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, bag) => {
          const { setErrors, setSubmitting } = bag;

          const response = await patch('/auth/profile/', values); // make request

          // .status .data defined by axios
          switch (response.status) {
            case 200:
              setInitialValues(response.data);
              // TODO: send notification
              break;
            case 400:
              setErrors(response.data); // errors for the right label
              break;
            default:
              // set default errors if unexpected event
              setErrors(FORM_CONST.default_errors.errors);
          }

          setSubmitting(false); // enable submit button on failure
        }} // TODO: edit handleSubmit, form_const
      >
        {({ isSubmitting, errors }) => (
          <Form
            style={{
              width: '90%',
              margin: 'auto'
            }}
          >
            {/* TODO: make header part of inputfield api */}
            <h3>
              <b>Email</b>
            </h3>
            <Field
              name="email"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              component={InputField}
            />
            <h3>
              <b>Phone-number</b>
            </h3>
            <Field
              name="phone"
              prefix={
                <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              component={InputField}
            />
            <h3>
              <b>Organization</b>
            </h3>
            <Field name="company" component={InputField} />
            <h3>
              <b>Location</b>
            </h3>
            <Field name="country" component={Selector} options={countries} />
            <h3>
              <b>Address</b>
            </h3>
            <Field
              name="address"
              prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                Confirm changes
              </Button>
            </FormItem>
            {errors.default ? (
              <FormItem>
                <Alert type="error" message={errors.default} showIcon />
              </FormItem>
            ) : null}
          </Form>
        )}
      </Formik>
    );
  } else {
    return <div>loading ...</div>; // TODO: show placeholders instead
  }
};

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .max(254, 'email must be shorter than 254 characters')
    .email('enter a valid email address')
    .required(),
  phone: yup.string().required(),
  address: yup.string(),
  country: yup.string().required(),
  company: yup.string()
});
