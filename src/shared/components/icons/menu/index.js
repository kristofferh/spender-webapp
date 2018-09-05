import React from "react";
import PropTypes from "prop-types";

const Menu = ({ color, size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
};

Menu.defaultProps = {
  size: 24
};

Menu.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

export default Menu;
