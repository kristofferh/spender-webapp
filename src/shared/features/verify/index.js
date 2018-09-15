import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { userLoggedIn } from "shared/data/user/actions";

import { verifyToken } from "./actions";

export class Verify extends Component {
  static propTypes = {
    location: PropTypes.object,
    verifyToken: PropTypes.func,
    token: PropTypes.string,
    isRequesting: PropTypes.bool,
    history: PropTypes.object,
    userLoggedIn: PropTypes.func,
    userToken: PropTypes.string
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
        this.props.userLoggedIn();
        // @todo: add secure token, if we're in prod environment.
        // @todo: set name and expiry in constants / environment variables.
        Cookies.set(SESSION_COOKIE, token, {
          secure: SECURE_COOKIE,
          expires: 7
        });
        this.props.history.push("/");
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
        {!this.props.token && (
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
  const { verifyToken, user } = state;
  return { ...verifyToken, userToken: user.token };
};

export default connect(mapStateToProps, { verifyToken, userLoggedIn })(Verify);
