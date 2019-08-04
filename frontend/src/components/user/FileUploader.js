import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import mimetypes from './mimetypes';

export default ({ field, form }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      const reader = new FileReader();

      // TODO: handle abort and error
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        form.setFieldValue(field.name, [...field.value, reader.result]);
      };

      acceptedFiles.forEach(file => reader.readAsBinaryString(file));
    },
    [form, field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: mimetypes
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
