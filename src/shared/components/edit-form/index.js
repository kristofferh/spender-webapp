import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import moment from "moment";

import { required, number } from "shared/utils/validators";

import { Input, Textarea, Select } from "shared/components/form-controls";

import { FormGroup, DeleteLink, Form } from "./styles";

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
      />
    </FormGroup>
    <FormGroup>
      <Field
        name="description"
        component={Textarea}
        label="Description"
        validate={required}
      />
    </FormGroup>
    <FormGroup>
      <Field name="tags" options={tags} component={Select} />
    </FormGroup>
    {error ? <span>{error}</span> : null}
    <button type="submit">Submit</button>
    {showDelete && <DeleteLink onClick={deleteCallback}>Delete</DeleteLink>}
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
