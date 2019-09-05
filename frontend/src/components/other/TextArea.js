import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

/**
 * wrapped antd TextArea
 *
 * @param { object } field information about the field, e.g. name, value
 * @param { object } form information about the form, used for displaying error
 * @param { object } props anything else you want to pass on
 */
export default ({ field, form: { touched, errors }, ...props }) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <FormItem
      help={errorMessage}
      validateStatus={errorMessage ? 'error' : null}
    >
      <TextArea {...props} {...field} />
    </FormItem>
  );
};
