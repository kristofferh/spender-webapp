import { withFormik } from "formik";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import EditForm, { Props as EditFormProps } from "shared/components/edit-form";
import { deleteItem, fetchItem, upsertItem } from "shared/data/item/actions";
import { omit } from "shared/utils/object";
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
  isSubmitting?: boolean;
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

  handleSubmit = async (values: any) => {
    await this.props.upsertItem({
      ...values,
      amount: Number(values.amount),
      id: this.props.id
    });
    this.props.history.push("/");
  };

  handleDelete = async () => {
    try {
      await this.props.deleteItem(this.props.id);
      this.props.history.push("/");
    } catch (errors) {
      console.log("something went weird", errors); // eslint-disable-line no-console
    }
  };

  render() {
    console.log(this.props);
    const { id, tags, initialValues, isSubmitting } = this.props;
    return (
      <Container>
        <Title>{id ? "Edit" : "Add"}</Title>
        <EditWrapper
          onSubmit={this.handleSubmit}
          tags={tags}
          showDelete={id ? true : false}
          deleteCallback={this.handleDelete}
          initialValues={initialValues}
          isSubmitting={isSubmitting}
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

export default connect(mapStateToProps, {
  upsertItem,
  fetchItem,
  deleteItem
})(Upsert);
