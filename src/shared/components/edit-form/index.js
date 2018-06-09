import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import moment from "moment";
import styled from "react-emotion";

import { required, number } from "shared/utils/validators";

import { Input, Textarea } from "shared/components/form-controls";

const Label = styled.label`
  display: block;
  margin-bottom: 15px;
`;

const EditForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Label>
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
    </Label>
    <Label>
      <Field
        name="amount"
        component={Input}
        type="number"
        attributes={{ step: "any" }}
        label="Amount"
        validate={[required, number]}
      />
    </Label>
    <Label>
      <Field
        name="description"
        component={Textarea}
        label="Description"
        validate={required}
      />
    </Label>
    <button type="submit">Submit</button>
  </form>
);

EditForm.propTypes = {
  handleSubmit: PropTypes.func
};

export default EditForm;
