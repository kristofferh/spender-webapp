import React, { ReactNode } from "react";

import FormWrapper from "../_form-wrapper";
import { StyledInput } from "./styles";

type Props = {
  attributes?: object;
  className?: string;
  field: {
    name: string;
  };
  form: {
    setFieldValue: (key: string, value: any) => void;
  };
  id?: string;
  label?: ReactNode;
  showPlaceholder?: boolean;
  placeholder?: string;
  type: string;
  pattern?: string;
  onChange?: (value: string) => void;
};

export const Input: React.FC<Props> = ({
  attributes,
  className = "form-control",
  form,
  field,
  id,
  placeholder,
  type = "text",
  pattern,
  onChange
}) => (
  <StyledInput
    {...attributes}
    {...field}
    onChange={(event: any) => {
      const value = event.target.value;
      if (onChange) {
        onChange(value);
      } else {
        form.setFieldValue(field.name, value);
      }
    }}
    className={className}
    id={id || field.name}
    placeholder={placeholder}
    type={type}
    pattern={pattern}
  />
);

export default FormWrapper(Input);
