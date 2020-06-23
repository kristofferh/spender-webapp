import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { black } from "shared/utils/styles";
import { composedValidators, email, required } from "shared/utils/validators";
import {
  Button,
  Container,
  Form,
  Header,
  InnerContainer,
  Loader,
  PageContainer,
  Slide,
  SlideContainer,
  StyledGuilloche,
  StyledInput,
  Success,
  Title
} from "./styles";

const SignupForm = ({ handleSubmit, invalid, success, isRequesting }) => (
  <PageContainer>
    <Container>
      <InnerContainer>
        <Header>
          <Title>Spender</Title>
        </Header>
        <SlideContainer success={success}>
          <Slide>
            {isRequesting ? (
              <Loader showBackground showDashAnimation color={black} />
            ) : (
              <Form onSubmit={handleSubmit}>
                <Field
                  hideLabelWrapper
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
    <StyledGuilloche />
  </PageContainer>
);

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  success: PropTypes.bool,
  isRequesting: PropTypes.bool
};

export default SignupForm;
