import PropTypes from "prop-types";
import React from "react";

const ArrowLeft = ({ className, color, size, ...svgProps }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...svgProps}
    >
      <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
    </svg>
  );
};

ArrowLeft.defaultProps = {
  size: 24
};

ArrowLeft.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string
};

export default ArrowLeft;
