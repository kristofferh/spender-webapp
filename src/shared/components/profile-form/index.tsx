import { Field, FormikProps } from "formik";
import moment from "moment";
import React from "react";
import { ActionButtons, Input, Select } from "shared/components/form-controls";
import { FormValues, Tag } from "shared/features/upsert";
import { composedValidators, number, required } from "shared/utils/validators";
import { Form, FormGroup } from "./styles";

export type Props = {
  tags: Tag[];
  showDelete: boolean;
  deleteCallback: () => void;
  status?: string;
};

const ProfileForm: React.FC<Props & FormikProps<FormValues>> = ({
  handleSubmit,
  tags,
  showDelete,
  deleteCallback,
  status,
  setFieldValue
}) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Field
        name="date"
        component={Input}
        type="datetime-local"
        label="Date"
        onChange={(value: any) => {
          if (value) {
            setFieldValue(
              "date",
              moment(value).format(moment.HTML5_FMT.DATETIME_LOCAL)
            );
          }
        }}
      />
    </FormGroup>
    <FormGroup>
      <Field
        name="amount"
        component={Input}
        type="number"
        attributes={{ step: "any" }}
        label="Amount"
        validate={composedValidators(required, number)}
      />
    </FormGroup>
    <FormGroup>
      <Field
        name="description"
        component={Input}
        label="Description"
        validate={required}
      />
    </FormGroup>
    <FormGroup>
      <Field label="Tags" name="tags" options={tags} component={Select} />
    </FormGroup>
    <ActionButtons error={status ? status : null} />
  </Form>
);

ProfileForm.defaultProps = {
  deleteCallback: () => {}
};

export default ProfileForm;
