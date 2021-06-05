import { Field, FormikProps } from "formik";
import { evaluate } from "mathjs";
import moment from "moment";
import React, { useRef, useState } from "react";
import { ActionButtons, Input, Select } from "shared/components/form-controls";
import { Calculate, Dialpad } from "shared/components/icons";
import { FormValues, Tag } from "shared/features/upsert";
import { composedValidators, number, required } from "shared/utils/validators";
import { Form, FormGroup, ToggleButton } from "./styles";

export type Props = {
  tags: Tag[];
  showDelete: boolean;
  deleteCallback: () => void;
  status?: string;
  isSubmitting?: boolean;
};

const EditForm: React.FC<Props & FormikProps<FormValues>> = ({
  handleSubmit,
  tags,
  showDelete,
  deleteCallback,
  status,
  setFieldValue,
  validateField,
  isSubmitting,
}) => {
  const [isDecimal, toggleDecimal] = useState(true);
  const amountRef = useRef<any>(null);
  const handleDecimalToggle = () => {
    toggleDecimal(!isDecimal);
    if (amountRef && amountRef.current) {
      amountRef.current.focus();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Field
          attributes={{
            autoFocus: true,
            inputMode: isDecimal ? "decimal" : "text",
          }}
          innerRef={amountRef}
          name="amount"
          component={Input}
          label="Amount"
          onBlur={(value: any) => {
            if (value) {
              try {
                const val = evaluate(value);
                setFieldValue("amount", val);
                setTimeout(() => {
                  validateField("amount");
                }, 10);
              } catch {}
            }
          }}
          validate={composedValidators(required, number)}
        />
        <ToggleButton onClick={handleDecimalToggle} type="button" tabIndex={-1}>
          {isDecimal ? <Dialpad /> : <Calculate />}
        </ToggleButton>
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
      <ActionButtons
        secondaryAction={showDelete}
        secondaryActionLabel="Delete"
        secondaryActionCallback={deleteCallback}
        error={status ? status : null}
        buttonState={status ? "error" : isSubmitting ? "loading" : ""}
      />
    </Form>
  );
};

EditForm.defaultProps = {
  deleteCallback: () => {},
};

export default EditForm;
