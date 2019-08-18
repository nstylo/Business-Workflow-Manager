import React from 'react';
import { Checkbox } from 'antd';

/**
 * checkbox which reports back to formik
 * @param { object } field refers back to formik field
 * @param { object } form refers back to formik form
 * @param { object } props anything else you want to pass on
 */
export default ({ field, form, ...props }) => {
  return (
    <Checkbox
      onChange={() => form.setFieldValue(field.name, !field.value)}
      {...field}
      {...props}
    />
  );
};
