import React from "react";
import PropTypes from "prop-types";

const Close = ({ className, color, size, ...svgProps }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...svgProps}
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};

Close.defaultProps = {
  size: 24
};

Close.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string
};

export default Close;
