import React from 'react';
import { Checkbox, Form, Alert } from 'antd';

const FormItem = Form.Item;

/**
 * checkbox which reports back to formik
 * @param { object } field refers back to formik field
 * @param { object } form refers back to formik form
 * @param { object } props anything else you want to pass on
 */
export default ({ field, form, ...props }) => {
  const { touched, errors } = form;
  const { name } = field;

  const errorMessage = touched[name] && errors[name];
  return (
    <FormItem>
      <Checkbox
        onChange={() => form.setFieldValue(field.name, !field.value)}
        checked={field.value}
        {...field}
        {...props}
      />
      {errorMessage ? (
        <Alert type="error" message={errorMessage} showIcon />
      ) : null}
    </FormItem>
  );
};
