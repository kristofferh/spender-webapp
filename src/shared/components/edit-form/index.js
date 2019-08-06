import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";

import { composedValidators, required, number } from "shared/utils/validators";

import { ActionButtons, Input, Select } from "shared/components/form-controls";

import { FormGroup, Form } from "./styles";

const EditForm = ({
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

EditForm.propTypes = {
  handleSubmit: PropTypes.func,
  tags: PropTypes.array,
  showDelete: PropTypes.bool,
  deleteCallback: PropTypes.func,
  status: PropTypes.string
};

export default EditForm;
