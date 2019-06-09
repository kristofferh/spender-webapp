import React from "react";
import PropTypes from "prop-types";

import { Wrapper, LabelWrapper, Label } from "./styles";

const FormWrapper = WrappedComponent => {
  const _Wrapper = props => {
    const {
      groupClassName,
      hideLabelWrapper,
      labelClassName,
      labelWrapperClassName,
      displayErrorOnInactive,
      id,
      label,
      required,
      input,
      meta: { touched, error, active, warning }
    } = props;
    const displayError =
      displayErrorOnInactive === true
        ? touched && error && !active
        : touched && error;

    const labelMarkup = (
      <LabelWrapper className={labelWrapperClassName}>
        <Label
          required={required}
          className={labelClassName}
          htmlFor={id || input.name}
        >
          {label}
        </Label>
      </LabelWrapper>
    );

    return (
      <Wrapper hasError={displayError} className={groupClassName}>
        {!hideLabelWrapper && labelMarkup}
        <WrappedComponent {...props} />
        {(displayError && <span className="required">{error}</span>) ||
          (!active && touched && warning && (
            <span className="warning">{warning}</span>
          ))}
      </Wrapper>
    );
  };

  _Wrapper.defaultProps = {
    required: false,
    displayErrorOnInactive: true
  };

  _Wrapper.propTypes = {
    groupClassName: PropTypes.string,
    hideLabelWrapper: PropTypes.bool,
    labelClassName: PropTypes.string,
    labelWrapperClassName: PropTypes.string,
    input: PropTypes.object.isRequired,
    displayErrorOnInactive: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.node,
    meta: PropTypes.object,
    required: PropTypes.bool.isRequired // required is required 😎
  };

  return _Wrapper;
};

export default FormWrapper;
