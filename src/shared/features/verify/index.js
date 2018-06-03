import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { verifyToken } from "./actions";

export class Verify extends Component {
  static propTypes = {
    location: PropTypes.object,
    verifyToken: PropTypes.func,
    token: PropTypes.string,
    isRequesting: PropTypes.bool
  };

  static defaultProps = {
    isRequesting: true
  };

  componentDidMount() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const delivery = query.get("delivery");
    this.props
      .verifyToken({ token, delivery })
      .then(({ token }) => {
        // @todo: add secure token, if we're in prod environment.
        // @todo: set name and expiry in constants / environment variables.
        Cookies.set(SESSION_COOKIE, token, { secure: SECURE_COOKIE, expires: 7 });
      })
      .catch(() => {
        Cookies.remove(SESSION_COOKIE);
      });
  }

  render() {
    return this.props.isRequesting ? (
      <div>Verifying</div>
    ) : (
      <div>
        {this.props.token ? (
          <div>Verified! You can close this window now</div>
        ) : (
          <div>
            Oops, something went weird.{" "}
            <Link to="/login">Try logging in again</Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { verifyToken } = state;
  return { ...verifyToken };
};

export default connect(mapStateToProps, { verifyToken })(Verify);
