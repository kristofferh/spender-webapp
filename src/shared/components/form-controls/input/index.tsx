import React, { ReactNode } from "react";
import FormWrapper from "../_form-wrapper";
import { StyledInput } from "./styles";

type Props = {
  attributes?: object;
  className?: string;
  field: {
    name: string;
  };
  id?: string;
  label?: ReactNode;
  showPlaceholder?: boolean;
  placeholder?: string;
  type: string;
  pattern?: string;
};

export const Input: React.FC<Props> = ({
  attributes,
  className = "form-control",
  field,
  id,
  placeholder,
  type = "text",
  pattern
}) => (
  <StyledInput
    {...attributes}
    {...field}
    className={className}
    id={id || field.name}
    placeholder={placeholder}
    type={type}
    pattern={pattern}
  />
);

export default FormWrapper(Input);
