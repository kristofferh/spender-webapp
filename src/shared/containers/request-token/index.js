import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SignupForm from "shared/components/signup-form";

import { requestToken } from "./actions";

const SignupWrapper = reduxForm({
  form: "RequestToken",
  enableReinitialize: true
})(SignupForm);

export class RequestToken extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.requestToken({ delivery: values.email, deliveryType: "email" });
  }

  render() {
    return <SignupWrapper onSubmit={this.handleSubmit} />;
  }
}

RequestToken.propTypes = {
  requestToken: PropTypes.func
};

export default connect(null, { requestToken })(RequestToken);
