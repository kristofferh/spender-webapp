import React from "react";
import { Field, FormikProps } from "formik";

import { Tag, FormValues } from "shared/features/upsert";

import { composedValidators, required, number } from "shared/utils/validators";

import { ActionButtons, Input, Select } from "shared/components/form-controls";

import { FormGroup, Form } from "./styles";

export type Props = {
  tags: Tag[];
  showDelete: boolean;
  deleteCallback: () => void;
  status?: string;
};

const EditForm: React.FC<Props & FormikProps<FormValues>> = ({
  handleSubmit,
  tags,
  showDelete,
  deleteCallback,
  status
}) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Field name="date" component={Input} type="datetime-local" label="Date" />
    </FormGroup>
    <FormGroup>
      <Field
        name="amount"
        component={Input}
        type="number"
        attributes={{ step: "any" }}
        label="Amount"
        validate={composedValidators(required, number)}
      />
    </FormGroup>
    <FormGroup>
      <Field
        name="description"
        component={Input}
        label="Description"
        validate={required}
      />
    </FormGroup>
    <FormGroup>
      <Field label="Tags" name="tags" options={tags} component={Select} />
    </FormGroup>
    <ActionButtons
      secondaryAction={showDelete}
      secondaryActionLabel="Delete"
      secondaryActionCallback={deleteCallback}
      error={status ? status : null}
    />
  </Form>
);

EditForm.defaultProps = {
  deleteCallback: () => {}
};

export default EditForm;
