import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

import { handleSubmit } from '../../../utils/requests';
import FORM_CONST from '../../../utils/form_const';

import FileUploader from '../../other/FileUploader';
import Selector from '../../other/Selector';
import InputField from '../../other/InputField';
import TextArea from '../../other/TextArea';
import { Button, Icon, Alert, Form as AntForm } from 'antd';

const FormItem = AntForm.Item;

const UploadView = props => {
  const { isSubmitting, errors } = props;
  return (
    <Form
      style={{
        width: '90%',
        margin: 'auto auto'
      }}
    >
      <Field
        name="name"
        prefix={<Icon type="pushpin" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Your job title ..."
        component={InputField}
      />
      <FormItem>
        <Field
          name="project"
          placeholder="Upload your files here ..."
          component={FileUploader}
        />
      </FormItem>
      <Field
        name="material"
        placeholder="Select the material"
        options={{ data: [{ value: 'material_1', label: 'material_1' }] }} // TODO: add materials
        component={Selector}
      />
      <Field
        name="description"
        prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Describe your project ..."
        component={TextArea}
      />
      <FormItem>
        <Button
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </FormItem>
      {errors.default ? (
        <FormItem>
          <Alert type="error" message={errors.default} showIcon />
        </FormItem>
      ) : null}
    </Form>
  );
};

const validationSchema = yup.object().shape({
  project: yup.mixed().required('Upload your file'),
  name: yup.string().required(),
  material: yup.string().required(),
  description: yup.string()
});

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({
    project: null,
    material: undefined, // null, empty string overrides placeholder of selector
    name: '',
    description: ''
  }),
  handleSubmit: async (values, bag) => {
    let formData = new FormData(); // make file/multipart upload
    formData.append('project', values.project);
    formData.append('name', values.name);
    formData.append('description', values.description);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    await handleSubmit(FORM_CONST.postFiles, formData, bag, config);
  }
})(UploadView);
