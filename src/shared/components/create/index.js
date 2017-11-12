import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles";

export class Create extends Component {
  render() {
    return (
      <div>
        <h1>Create</h1>
        <form>
          <label className="form-group form-group--vertical">
            <span className="form-group-label-text">Date</span>
            <input type="date" />
          </label>
          <label className="form-group form-group--vertical">
            <span className="form-group-label-text">Amount</span>
            <input type="number" />
          </label>
          <label className="form-group form-group--vertical">
            <span className="form-group-label-text">Description</span>
            <textarea />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect()(Create);
