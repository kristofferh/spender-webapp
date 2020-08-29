import { FieldProps } from "formik";
import React, { forwardRef, ReactNode } from "react";
import FormWrapper from "../_form-wrapper";
import { StyledInput } from "./styles";

interface Props extends FieldProps {
  attributes?: object;
  className?: string;
  id?: string;
  label?: ReactNode;
  showPlaceholder?: boolean;
  placeholder?: string;
  type: string;
  pattern?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      attributes,
      className = "form-control",
      form,
      field,
      id,
      placeholder,
      type = "text",
      pattern,
      onChange,
      onBlur
    },
    ref
  ) => {
    const { name } = field;
    const { touched, errors } = form;
    const hasError = Boolean(touched[name] && errors[name]);
    return (
      <StyledInput
        ref={ref}
        {...attributes}
        {...field}
        hasError={hasError}
        onChange={(event: any) => {
          const value = event.target.value;
          if (onChange) {
            onChange(value);
          } else {
            form.setFieldValue(field.name, value);
          }
        }}
        onBlur={(event: any) => {
          const value = event.target.value;
          if (onBlur) {
            onBlur(value);
          }
          form.handleBlur(event);
        }}
        className={className}
        id={id || field.name}
        placeholder={placeholder}
        type={type}
        pattern={pattern}
      />
    );
  }
);

export default FormWrapper(Input);
