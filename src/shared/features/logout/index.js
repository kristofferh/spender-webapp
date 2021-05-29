import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cookies from "js-cookie";

import { userLogout } from "shared/data/user/actions";

export class Logout extends Component {
  static propTypes = {
    userLogout: PropTypes.func,
    history: PropTypes.object,
  };

  componentDidMount() {
    Cookies.remove(SESSION_COOKIE);
    this.props.userLogout();
    this.props.history.push("/");
  }

  render() {
    return <div />;
  }
}

export default connect(null, { userLogout })(Logout);
