import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import EditForm from "shared/components/edit-form";

import { upsertItem, fetchItem } from "./actions";

export class Edit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    if (id) {
      this.props.fetchItem(id);
    }
  }

  handleSubmit(values) {
    const { match: { params: { id = {} } } } = this.props;
    this.props.upsertItem({ ...values, id });
  }

  render() {
    return (
      <div>
        <h1>Edit</h1>
        <EditForm
          onSubmit={this.handleSubmit}
          initialValues={this.props.initialValues}
          errors={this.props.errors}
        />
      </div>
    );
  }
}

Edit.propTypes = {
  upsertItem: PropTypes.func,
  fetchItem: PropTypes.func,
  match: PropTypes.object,
  initialValues: PropTypes.object,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const mapStateToProps = state => {
  const { edit: { item: initialValues, errors } } = state;
  return {
    ...state,
    initialValues,
    errors
  };
};

export default connect(mapStateToProps, { upsertItem, fetchItem })(Edit);
