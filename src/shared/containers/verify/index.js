import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { verifyToken } from "./actions";

export class Verify extends Component {
  static propTypes = {
    location: PropTypes.object,
    verifyToken: PropTypes.func
  };

  componentDidMount() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const delivery = query.get("delivery");
    this.props.verifyToken({ token, delivery });
  }

  render() {
    return <div>Verify</div>;
  }
}

const mapStateToProps = state => {
  const { verifyToken } = state;
  return { ...verifyToken };
};

export default connect(mapStateToProps, { verifyToken })(Verify);
