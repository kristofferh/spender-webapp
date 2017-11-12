import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addItem } from "./actions";
import "./styles";

export class Create extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addItem(this.state);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Create</h1>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <label className="form-group form-group--vertical">
            <span className="form-group-label-text">Date</span>
            <input name="date" type="date" />
          </label>
          <label className="form-group form-group--vertical">
            <span className="form-group-label-text">Amount</span>
            <input name="amount" type="number" step="any" />
          </label>
          <label className="form-group form-group--vertical">
            <span className="form-group-label-text">Description</span>
            <textarea name="description" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

Create.propTypes = {
  addItem: PropTypes.func
};

export default connect(null, { addItem })(Create);
