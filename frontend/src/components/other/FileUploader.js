import React from 'react';
import mimetypes from '../../utils/mimetypes';

import { Upload, Icon, Alert } from 'antd';
const { Dragger } = Upload;

export default ({ field, form }) => {
  const { errors } = form;
  return (
    <div>
      <Dragger
        name="file"
        multiple={true}
        accept={mimetypes}
        fileList={field.value}
        beforeUpload={file => {
          form.setFieldValue(field.name, [...field.value, file]);
          return false;
        }}
        onRemove={file => {
          const index = field.value.indexOf(file);
          const newValue = field.value.slice();
          newValue.splice(index, 1);
          form.setFieldValue(field.name, newValue);
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
      {errors[field.name] ? (
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
