import React from "react";
import { withFormik } from "formik";

// eslint-disable-next-line react/display-name
export const FormikFormDecorator = (config = {}) => story => {
  const Decorated = withFormik({
    displayName: "storybook",
    handleSubmit: (values, { setSubmitting }) => {},
    ...config
  })(story);
  return <Decorated />;
};
