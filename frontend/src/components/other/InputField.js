import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

/**
 * Standard input field for forms using Formik
 * @param { object } field information about the field, e.g. name, value
 * @param { object } form information about the form, used for displaying error
 * @param { object } props anything else you want to pass on
 */
export default ({ field, form: { touched, errors }, ...props }) => {
  const { name } = field;

  // set error only if touched
  const errorMessage = touched[name] && errors[name];
  return (
    <FormItem
      help={errorMessage}
      validateStatus={errorMessage ? 'error' : null}
    >
      {props.type === 'password' ? (
        <Input.Password {...field} {...props}></Input.Password>
      ) : (
        <Input {...field} {...props}></Input>
      )}
    </FormItem>
  );
};
