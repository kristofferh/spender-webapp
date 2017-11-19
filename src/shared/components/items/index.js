import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Create from "shared/components/create";

export class Items extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        Items
        <Create />
      </div>
    );
  }
}

Items.propTypes = {
  routes: PropTypes.array
};

const mapStateToProps = state => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps)(Items);
