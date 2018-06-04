import React from "react";
import PropTypes from "prop-types";

import FormWrapper from "../_form-wrapper";

export const Input = ({
  attributes,
  className,
  input,
  id,
  placeholder,
  type
}) => (
  <input
    {...attributes}
    {...input}
    className={className}
    id={id || input.name}
    placeholder={placeholder}
    type={type}
  />
);

Input.defaultProps = {
  type: "text",
  className: "form-control"
};

Input.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  input: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.node,
  showPlaceholder: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string.isRequired
};

export default FormWrapper(Input);
