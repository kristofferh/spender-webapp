import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import moment from "moment";
import styled from "react-emotion";

import { required, number } from "shared/utils/validators";

import { Input, Textarea, Select } from "shared/components/form-controls";

const FormGroup = styled.div`
  display: block;
  margin-bottom: 15px;
`;

const EditForm = ({ handleSubmit, tags }) => (
  <form onSubmit={handleSubmit}>
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
    <button type="submit">Submit</button>
  </form>
);

EditForm.propTypes = {
  handleSubmit: PropTypes.func,
  tags: PropTypes.array
};

export default EditForm;
