import React, { Component } from "react";
import { reduxForm } from "redux-form";

import SignupForm from "shared/components/signup-form";

const SignupWrapper = reduxForm({
  form: "Edit",
  enableReinitialize: true
})(SignupForm);

export class RequestToken extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    //this.props.upsertItem({ ...values, id: this.props.id });
  }

  render() {
    return <SignupWrapper onSubmit={this.handleSubmit} />;
  }
}

export default RequestToken;
