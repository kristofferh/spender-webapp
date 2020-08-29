import React, { ReactType } from "react";
import { Error, Label, LabelWrapper, Wrapper } from "./styles";

export type WrapperProps = {
  groupClassName?: string;
  hideLabelWrapper?: boolean;
  labelClassName?: string;
  labelWrapperClassName?: string;
  id?: string;
  label?: string;
  required?: boolean;
  field: { name: string };
  form: {
    touched: { [prop: string]: boolean };
    errors: { [prop: string]: string };
  };
  innerRef?: any;
};

const FormWrapper = (WrappedComponent: ReactType) => {
  const _Wrapper = (props: WrapperProps) => {
    const {
      groupClassName,
      hideLabelWrapper,
      labelClassName,
      labelWrapperClassName,
      id,
      label,
      required,
      field: { name },
      form: { touched, errors },
      innerRef
    } = props;
    const displayError = Boolean(touched[name] && errors[name]);

    const labelMarkup = (
      <LabelWrapper className={labelWrapperClassName}>
        <Label
          required={required}
          className={labelClassName}
          htmlFor={id || name}
        >
          {label}
        </Label>
      </LabelWrapper>
    );

    return (
      <Wrapper hasError={displayError} className={groupClassName}>
        {!hideLabelWrapper && labelMarkup}
        <WrappedComponent ref={innerRef} {...props} />
        {displayError && <Error>{errors[name]}</Error>}
      </Wrapper>
    );
  };

  return _Wrapper;
};

export default FormWrapper;
