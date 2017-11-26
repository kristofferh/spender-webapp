import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import EditForm from "shared/components/edit-form";

import { addItem } from "./actions";

export class Edit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleSubmit(values) {
    this.props.addItem(values);
  }

  render() {
    return (
      <div>
        <h1>Edit</h1>
        <EditForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

Edit.propTypes = {
  addItem: PropTypes.func
};

export default connect(null, { addItem })(Edit);
