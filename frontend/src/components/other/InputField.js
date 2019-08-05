import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

export default ({ field, form: { touched, errors }, ...props }) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <FormItem
      help={errorMessage}
      validateStatus={errorMessage ? 'error' : null}
    >
      <Input {...field} {...props}></Input>
    </FormItem>
  );
};
