import React from 'react';

import { Select, Form } from 'antd';
const { Option } = Select;
const FormItem = Form.Item;

export default ({ field, form, placeholder, ...props }) => {
  const { touched, errors } = form;
  const { options } = props;
  const { name } = field;

  const errorMessage = touched[name] && errors[name];
  return (
    <FormItem
      help={errorMessage}
      validateStatus={errorMessage ? 'error' : null}
    >
      <Select
        name={name}
        placeholder={placeholder}
        showSearch
        style={{ width: 300 }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onSelect={option => {
          return form.setFieldValue(name, option);
        }}
      >
        {options.data.map(option => (
          <Option key={option.value}>{option.label}</Option>
        ))}
      </Select>
    </FormItem>
  );
};
