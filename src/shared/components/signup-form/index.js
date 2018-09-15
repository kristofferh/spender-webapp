import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";

import { required, email } from "shared/utils/validators";

import { Container, Form, StyledInput, Button } from "./styles";

const SignupForm = ({ handleSubmit, invalid }) => (
  <Container>
    <Form onSubmit={handleSubmit}>
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
  </Container>
);

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool
};

export default SignupForm;
