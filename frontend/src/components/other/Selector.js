import React from 'react';

import { Select, Form } from 'antd';
const { Option } = Select;
const FormItem = Form.Item;

/**
 * wrapped antd selector which reads a dictionary of data
 * @param { object } field refers back to formik field
 * @param { object } form refers back to formik form
 * @param { object } props anything else you want to pass on
 */
export default ({ field, form, ...props }) => {
  const { touched, errors } = form;
  const { name } = field;
  const { options, placeholder } = props; // population data and field placeholder

  const errorMessage = touched[name] && errors[name];
  return (
    <FormItem help={errorMessage} validateStatus="error">
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
