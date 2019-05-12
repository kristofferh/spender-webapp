import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import moment from "moment";

import { required, number } from "shared/utils/validators";

import { ActionButtons, Input, Select } from "shared/components/form-controls";

import { FormGroup, Form } from "./styles";

const EditForm = ({
  handleSubmit,
  tags,
  error,
  showDelete,
  deleteCallback
}) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Field
        name="date"
        component={Input}
        type="datetime-local"
        format={value => {
          return value
            ? moment(value).format(moment.HTML5_FMT.DATETIME_LOCAL)
            : "";
        }}
        label="Date"
      />
    </FormGroup>
    <FormGroup>
      <Field
        name="amount"
        component={Input}
        type="number"
        attributes={{ step: "any" }}
        label="Amount"
        validate={[required, number]}
        parse={value => {
          return value ? Number(value) : null;
        }}
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
      error={error ? error : null}
    />
  </Form>
);

EditForm.defaultProps = {
  deleteCallback: () => {}
};

EditForm.propTypes = {
  handleSubmit: PropTypes.func,
  tags: PropTypes.array,
  error: PropTypes.string,
  showDelete: PropTypes.bool,
  deleteCallback: PropTypes.func
};

export default EditForm;
