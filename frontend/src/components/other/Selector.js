import React from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

/**
 * wrapped antd selector which reads a dictionary of data
 * @param { object } field information about the field, e.g. name, value
 * @param { object } form information about the form, used for displaying error
 * @param { object } props anything else you want to pass on
 */
export default ({ field, form, ...props }) => {
  const { touched, errors } = form;
  const { name, value } = field; // name and initial value of selector
  const { options, placeholder } = props; // population data and field placeholder

  // set errors only when touched
  const errorMessage = touched[name] && errors[name];
  return (
    <FormItem
      help={errorMessage}
      validateStatus={errorMessage ? 'error' : null}
    >
      <Select
        name={name}
        value={value}
        placeholder={placeholder}
        showSearch
        style={{ width: 300 }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onSelect={option => form.setFieldValue(name, option)}
      >
        {options.data.map(option => (
          <Option key={option.value}>{option.label}</Option>
        ))}
      </Select>
    </FormItem>
  );
};
