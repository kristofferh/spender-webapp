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
  static propTypes = {
    requestToken: PropTypes.func,
    success: PropTypes.bool,
    isRequesting: PropTypes.bool,
    errors: PropTypes.object
  };

  handleSubmit = values => {
    this.props.requestToken({ delivery: values.email, deliveryType: "email" });
  };

  render() {
    const { success, errors } = this.props;
    return success ? (
      <div>Cool</div>
    ) : (
      <SignupWrapper errors={errors} onSubmit={this.handleSubmit} />
    );
  }
}

const mapStateToProps = state => {
  const { requestToken } = state;
  return { ...requestToken };
};

export default connect(mapStateToProps, { requestToken })(RequestToken);
