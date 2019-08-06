import React, { Component } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import moment from "moment";

import { omit } from "shared/utils/object";

import EditForm, { Props as EditFormProps } from "shared/components/edit-form";

import { upsertItem, fetchItem, deleteItem } from "shared/data/item/actions";

import { Container, Title } from "./styles";

export type Tag = {
  name: string;
  color?: string;
};

export type FormValues = {
  date?: string;
  amount: string | number;
  description: string;
  tags: Tag[];
};

type Props = {
  upsertItem: ({}) => Promise<any>;
  fetchItem: (id: string | number) => void;
  fetchTags: () => void;
  deleteItem: (id: string | number) => Promise<any>;
  match: {};
  initialValues: FormValues;
  errors: {};
  id: number | string;
  tags: Tag[];
  history: {
    push: (path: string) => void;
  };
};

type FormProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<any>;
};

const EditWrapper = withFormik<FormProps & EditFormProps, FormValues>({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => {
    let { date } = initialValues;
    if (date) {
      date = moment(date).format(moment.HTML5_FMT.DATETIME_LOCAL);
    }
    return { ...initialValues, date };
  },
  handleSubmit: async (values, { setStatus, props: { onSubmit } }) => {
    if (values.date === "") {
      values = omit(values, "date") as FormValues;
    }
    try {
      await onSubmit(values);
    } catch {
      setStatus("Something went weird.");
    }
  }
})(EditForm);

export class Upsert extends Component<Props> {
  static defaultProps = {
    tags: []
  };

  componentDidMount() {
    this.props.fetchItem(this.props.id);
  }

  handleSubmit = (values: any) => {
    return this.props.upsertItem({ ...values, id: this.props.id }).then(() => {
      this.props.history.push("/");
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
    const { id, tags, initialValues } = this.props;
    return (
      <Container>
        <Title>{id ? "Edit" : "Add"}</Title>
        <EditWrapper
          onSubmit={this.handleSubmit}
          tags={tags}
          showDelete={id ? true : false}
          deleteCallback={this.handleDelete}
          initialValues={initialValues}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const defaultInitialValues: FormValues = {
    date: "",
    amount: "",
    description: "",
    tags: []
  };
  const {
    item: {
      user: { item: initialValues = defaultInitialValues, tags },
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
      ? initialValues.tags.edges.map((tag: any) => tag.node)
      : [];

  const availableTags =
    tags && tags.edges ? tags.edges.map((tag: any) => tag.node) : [];

  return {
    ...state,
    tags: availableTags,
    initialValues: { ...initialValues, tags: existingTags },
    errors,
    id
  };
};

export default connect(
  mapStateToProps,
  {
    upsertItem,
    fetchItem,
    deleteItem
  }
)(Upsert);
