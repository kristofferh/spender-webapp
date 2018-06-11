import React from "react";
import PropTypes from "prop-types";
import { Creatable } from "react-select";

import FormWrapper from "../_form-wrapper";

const isValidNewOption = (inputValue, selectValue, selectOptions) => {
  if (
    inputValue.trim().length === 0 ||
    selectOptions.find(option => option.name === inputValue)
  ) {
    return false;
  }
  return true;
};

// @todo: check if https://github.com/JedWatson/react-select/pull/2659/files
// has been merged. After that isValidNewOption and getNewOptionData can
// probably be deleted.
export const Select = ({ attributes, input, id, placeholder, options }) => (
  <Creatable
    {...attributes}
    {...input}
    isValidNewOption={isValidNewOption}
    getNewOptionData={(inputValue, optionLabel) => ({
      name: optionLabel
    })}
    getOptionValue={option => option.name}
    getOptionLabel={option => option.name}
    onBlur={() => input.onBlur(input.value.value)}
    isMulti
    id={id || input.name}
    placeholder={placeholder}
    options={options}
  />
);

Select.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  attributes: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  showPlaceholder: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default FormWrapper(Select);
