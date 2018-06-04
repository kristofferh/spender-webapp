import React from "react";
import PropTypes from "prop-types";

import FormWrapper from "../_form-wrapper";

export const Textarea = ({ attributes, className, input, id, placeholder }) => (
  <textarea
    {...attributes}
    {...input}
    className={className}
    id={id || input.name}
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
  input: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.node,
  showPlaceholder: PropTypes.bool,
  placeholder: PropTypes.string
};

export default FormWrapper(Textarea);
