import { Field, FormikProps } from "formik";
import React from "react";
import {
  ActionButtons,
  FileUpload,
  Input
} from "shared/components/form-controls";
import { FormValues } from "shared/features/profile";
import { Form, FormGroup } from "./styles";

export type Props = {
  onDrop?: (files: any) => void;
  status?: string;
};

const ProfileForm: React.FC<Props & FormikProps<FormValues>> = ({
  handleSubmit,
  status,
  onDrop,
  setFieldValue
}) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Field
        name="avatar"
        component={FileUpload}
        label="Avatar"
        accept="image/*"
        onDrop={onDrop}
      />
    </FormGroup>
    <FormGroup>
      <Field name="firstName" component={Input} label="First name" />
    </FormGroup>
    <ActionButtons error={status ? status : null} />
  </Form>
);

export default ProfileForm;
