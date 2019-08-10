import React from 'react';
import { Checkbox } from 'antd';
// import { Form } from 'antd';
// const FormItem = Form.Item;

export default ({ field, form, ...props }) => {
  return (
    <Checkbox
      onChange={() => form.setFieldValue(field.name, !field.value)}
      {...field}
      {...props}
    />
  );
};
