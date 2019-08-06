import React from "react";
import PropTypes from "prop-types";

import FormWrapper from "../_form-wrapper";

import { StyledInput } from "./styles";

export const Textarea = ({ attributes, className, field, id, placeholder }) => (
  <StyledInput
    {...attributes}
    {...field}
    className={className}
    id={id || field.name}
    placeholder={placeholder}
  />
);

Textarea.defaultProps = {
  showPlaceholder: false,
  className: "form-control"
};

Textarea.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  field: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.node,
  showPlaceholder: PropTypes.bool,
  placeholder: PropTypes.string
};

export default FormWrapper(Textarea);
