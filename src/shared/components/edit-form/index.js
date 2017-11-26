import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";

const EditForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label className="form-group form-group--vertical">
      <span className="form-group-label-text">Date</span>
      <Field name="date" component="input" type="datetime-local" />
    </label>
    <label className="form-group form-group--vertical">
      <span className="form-group-label-text">Amount</span>
      <Field name="amount" component="input" type="number" step="any" />
    </label>
    <label className="form-group form-group--vertical">
      <span className="form-group-label-text">Description</span>
      <Field name="description" component="textarea" />
    </label>
    <button type="submit">Submit</button>
  </form>
);

EditForm.propTypes = {
  handleSubmit: PropTypes.func
};

const EditWrapper = reduxForm({
  form: "Edit"
})(EditForm);

export default EditWrapper;
