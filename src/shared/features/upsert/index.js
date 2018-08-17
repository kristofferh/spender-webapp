import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm, SubmissionError } from "redux-form";

import EditForm from "shared/components/edit-form";

import { upsertItem, fetchItem, deleteItem } from "shared/data/item/actions";

const EditWrapper = reduxForm({
  form: "Edit",
  enableReinitialize: true
})(EditForm);

export class Upsert extends Component {
  static propTypes = {
    upsertItem: PropTypes.func,
    fetchItem: PropTypes.func,
    fetchTags: PropTypes.func,
    deleteItem: PropTypes.func,
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
    this.props.fetchItem(this.props.id);
  }

  handleSubmit = values => {
    return this.props
      .upsertItem({ ...values, id: this.props.id })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(errors => {
        console.log("something went weird", errors); // eslint-disable-line no-console
        throw new SubmissionError({ _error: "Something went weird." });
      });
  };

  handleDelete = () => {
    return this.props
      .deleteItem(this.props.id)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(errors => {
        console.log("something went weird", errors); // eslint-disable-line no-console
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
          showDelete={this.props.id ? true : false}
          deleteCallback={this.handleDelete}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    item: {
      user: { item: initialValues = {}, tags },
      errors
    }
  } = state;
  const {
    match: {
      params: { id = undefined }
    }
  } = ownProps;

  const existingTags =
    initialValues.tags && initialValues.tags.edges
      ? initialValues.tags.edges.map(tag => tag.node)
      : [];

  const availableTags =
    tags && tags.edges ? tags.edges.map(tag => tag.node) : [];

  return {
    ...state,
    tags: availableTags,
    initialValues: id ? { ...initialValues, tags: existingTags } : {},
    errors,
    id
  };
};

export default connect(mapStateToProps, {
  upsertItem,
  fetchItem,
  deleteItem
})(Upsert);
