import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import styled from "styled-components";

import { required, email } from "shared/utils/validators";

import { Input } from "shared/components/form-controls";

const Form = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
`;

const Button = styled.button`
  width: 100%;
  border: 0;
  background-color: ${props =>
    props.disabled ? "rgba(0, 0, 0, 0.1)" : "#000"};
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
`;

const StyledInput = styled(Input)`
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 3px 0 5px;
  transition: border-bottom 0.2s ease;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    border-bottom-color: #000;
    outline: 0;
  }
`;

const SignupForm = ({ handleSubmit, invalid }) => (
  <Form className="signup-form" onSubmit={handleSubmit}>
    <Field
      placeholder="Enter your email"
      component={StyledInput}
      name="email"
      type="email"
      validate={[required, email]}
    />
    <Button type="submit" disabled={invalid}>
      Go
    </Button>
  </Form>
);

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool
};

export default SignupForm;
