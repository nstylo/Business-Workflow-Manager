import React, { useState, useEffect } from 'react';
import FILETYPES from '../../utils/filetypes';

import { Upload, Icon, Alert } from 'antd';
const { Dragger } = Upload;

/**
 * File upload for forms
 * @param { object } props
 * @param { object } props.field holds field specific values, e.g. uploaded files
 * @param { object } props.form holds callbacks to form, e.g. setFieldValue
 */
export default ({ field, form }) => {
  const { touched, errors } = form; // get errors
  const [fileArr, setFileArr] = useState([]);

  useEffect(() => {
    // update local state depending on form state
    if (field.value) {
      // TODO: increase type safety
      // if field contains a file
      setFileArr([field.value]);
    } else {
      setFileArr([]);
    }
  }, [field.value]);

  return (
    <div>
      <Dragger
        name="file"
        multiple={false}
        accept={FILETYPES}
        fileList={fileArr}
        beforeUpload={file => {
          form.setFieldValue(field.name, file); // set field state
          return false; // don't use default antd submit
        }}
        onRemove={file => {
          form.setFieldValue(field.name, null); // set field state
        }}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint"></p>
      </Dragger>
      {touched[field.name] && errors[field.name] ? (
        <Alert
          style={{ margin: '10px 0 0 0' }}
          message={errors[field.name]}
          type="error"
          showIcon
        />
      ) : null}
    </div>
  );
};
