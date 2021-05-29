import React from "react";
import PropTypes from "prop-types";

const ArrowDown = ({ className, color, size, ...svgProps }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...svgProps}
    >
      <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
      <path d="M0-.75h24v24H0z" fill="none" />
    </svg>
  );
};

ArrowDown.defaultProps = {
  size: 24,
};

ArrowDown.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default ArrowDown;
