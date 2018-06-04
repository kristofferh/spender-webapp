import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";

import { required } from "shared/utils/validators";

import { Input } from "shared/components/form-controls";

import "./styles/index.scss";

const SignupForm = ({ handleSubmit }) => (
  <form className="signup-form" onSubmit={handleSubmit}>
    <Field component={Input} name="email" type="email" validate={required} />
    <button type="submit">Go</button>
  </form>
);

SignupForm.propTypes = {
  handleSubmit: PropTypes.func
};

export default SignupForm;
