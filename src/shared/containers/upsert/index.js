import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import EditForm from "shared/components/edit-form";

import { upsertItem, fetchItem } from "./actions";

const EditWrapper = reduxForm({
  form: "Edit",
  enableReinitialize: true
})(EditForm);

export class Upsert extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.id) {
      this.props.fetchItem(this.props.id);
    }
  }

  handleSubmit(values) {
    this.props.upsertItem({ ...values, id: this.props.id });
  }

  render() {
    return (
      <div>
        <h1>{this.props.id ? "Edit" : "Add"}</h1>
        <EditWrapper
          onSubmit={this.handleSubmit}
          initialValues={this.props.initialValues}
          errors={this.props.errors}
        />
      </div>
    );
  }
}

Upsert.propTypes = {
  upsertItem: PropTypes.func,
  fetchItem: PropTypes.func,
  match: PropTypes.object,
  initialValues: PropTypes.object,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const mapStateToProps = (state, ownProps) => {
  const { upsert: { item: initialValues, errors } } = state;
  const { match: { params: { id = undefined } } } = ownProps;
  return {
    ...state,
    initialValues,
    errors,
    id
  };
};

export default connect(mapStateToProps, { upsertItem, fetchItem })(Upsert);
