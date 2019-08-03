import React from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

export default ({ field, form }) => {
  const options = countryList().getData();
  return (
    <Select
      options={options}
      name={field.name}
      value={
        options ? options.find(option => option.value === field.value) : ''
      }
      onChange={option => form.setFieldValue(field.name, option.value)}
    />
  );
};
