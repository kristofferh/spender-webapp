import React, { Component } from "react";
import { withFormik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SignupForm from "shared/components/signup-form";

import { requestToken } from "./actions";

const SignupWrapper = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: ""
  }),
  handleSubmit: (values, { props: { onSubmit } }) => {
    onSubmit(values);
  }
})(SignupForm);

export class RequestToken extends Component {
  static propTypes = {
    requestToken: PropTypes.func,
    success: PropTypes.bool,
    isRequesting: PropTypes.bool,
    errors: PropTypes.array
  };

  handleSubmit = values => {
    this.props.requestToken({ delivery: values.email, deliveryType: "email" });
  };

  render() {
    return <SignupWrapper {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = state => {
  const { requestToken } = state;
  return { ...requestToken };
};

export default connect(
  mapStateToProps,
  { requestToken }
)(RequestToken);
