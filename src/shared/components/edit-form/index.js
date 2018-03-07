import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import moment from "moment";

import { required, number } from "shared/utils/validators";

import { Input, Textarea } from "shared/components/form-controls";

import "./styles/index.scss";

const EditForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label className="form-group form-group--vertical">
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
    </label>
    <label className="form-group form-group--vertical">
      <Field
        name="amount"
        component={Input}
        type="number"
        attributes={{ step: "any" }}
        label="Amount"
        validate={[required, number]}
      />
    </label>
    <label className="form-group form-group--vertical">
      <Field
        name="description"
        component={Textarea}
        label="Description"
        validate={required}
      />
    </label>
    <button type="submit">Submit</button>
  </form>
);

EditForm.propTypes = {
  handleSubmit: PropTypes.func
};

export default EditForm;
