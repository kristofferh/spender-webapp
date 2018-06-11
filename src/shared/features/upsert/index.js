import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm, SubmissionError } from "redux-form";

import EditForm from "shared/components/edit-form";

import { upsertItem, fetchItem, fetchTags } from "./actions";

const EditWrapper = reduxForm({
  form: "Edit",
  enableReinitialize: true
})(EditForm);

export class Upsert extends Component {
  static propTypes = {
    upsertItem: PropTypes.func,
    fetchItem: PropTypes.func,
    fetchTags: PropTypes.func,
    match: PropTypes.object,
    initialValues: PropTypes.object,
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    tags: PropTypes.array,
    history: PropTypes.object
  };

  static defaultProps = {
    initialValues: {},
    tags: []
  };

  componentDidMount() {
    if (this.props.id) {
      this.props.fetchItem(this.props.id);
    }
    this.props.fetchTags();
  }

  handleSubmit = values => {
    return this.props
      .upsertItem({ ...values, id: this.props.id })
      .then(() => {
        this.props.history.push("/items");
      })
      .catch(errors => {
        console.log("something went weird", errors); // eslint-disable-line no-console
        throw new SubmissionError({ _error: "Something went weird." });
      });
  };

  render() {
    return (
      <div>
        <h1>{this.props.id ? "Edit" : "Add"}</h1>
        <EditWrapper
          onSubmit={this.handleSubmit}
          initialValues={this.props.initialValues}
          errors={this.props.errors}
          tags={this.props.tags}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    upsert: { tags, item: initialValues, errors }
  } = state;
  const {
    match: {
      params: { id = undefined }
    }
  } = ownProps;
  return {
    ...state,
    tags,
    initialValues: id ? initialValues : {},
    errors,
    id
  };
};

export default connect(mapStateToProps, { upsertItem, fetchItem, fetchTags })(
  Upsert
);
