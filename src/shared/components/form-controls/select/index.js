import React from "react";
import PropTypes from "prop-types";
import { Creatable } from "react-select";

import Label from "shared/components/label";

import { gray, inputGradient } from "shared/utils/styles";

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

const customStyles = {
  control: (styles, { selectProps: { menuIsOpen } }) => ({
    ...styles,
    border: 0,
    borderBottom: `1px solid ${gray}`,
    padding: "5px 0",
    minHeight: 40,
    appearance: "none",
    borderRadius: 0,
    boxShadow: "none",
    borderImage: menuIsOpen ? `${inputGradient} 2` : null,
    ":hover": {
      borderBottom: `1px solid ${gray}`
    }
  }),
  menu: styles => {
    return {
      ...styles,
      borderRadius: 2,
      boxShadow: "0 1px 1px 1px rgba(17, 17, 17, 0.2)"
    };
  },
  valueContainer: styles => ({
    ...styles,
    padding: 0
  })
};

const MultiValue = props => {
  const {
    data: { name, color },
    removeProps
  } = props;
  return (
    <Label
      isRemovable={true}
      bgColor={color}
      {...props}
      removeProps={removeProps}
    >
      {name}
    </Label>
  );
};

MultiValue.propTypes = {
  data: PropTypes.object,
  removeProps: PropTypes.object
};

// @todo: check if https://github.com/JedWatson/react-select/pull/2659/files
// has been merged. After that isValidNewOption and getNewOptionData can
// probably be deleted.
export const Select = ({ attributes, input, id, placeholder, options }) => (
  <Creatable
    {...attributes}
    {...input}
    components={{
      MultiValue
    }}
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
    styles={customStyles}
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
