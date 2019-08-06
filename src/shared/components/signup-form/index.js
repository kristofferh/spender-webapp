import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";

import { composedValidators, required, email } from "shared/utils/validators";
import { black } from "shared/utils/styles";

import Loader from "shared/components/loader";

import {
  Container,
  InnerContainer,
  Form,
  StyledInput,
  Button,
  SlideContainer,
  Slide,
  Success
} from "./styles";

const SignupForm = ({ handleSubmit, invalid, success, isRequesting }) => (
  <Container>
    <InnerContainer>
      <SlideContainer success={success}>
        <Slide>
          {isRequesting ? (
            <Loader color={black} />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Field
                placeholder="Enter your email"
                component={StyledInput}
                name="email"
                type="email"
                validate={composedValidators(required, email)}
              />
              <Button type="submit" disabled={invalid}>
                Go
              </Button>
            </Form>
          )}
        </Slide>
        <Slide>
          <Success>Okay, great. Go check your inbox.</Success>
        </Slide>
      </SlideContainer>
    </InnerContainer>
  </Container>
);

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  success: PropTypes.bool,
  isRequesting: PropTypes.bool
};

export default SignupForm;
