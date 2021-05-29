import PropTypes from "prop-types";
import React from "react";

const ArrowRight = ({ className, color, size, ...svgProps }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...svgProps}
    >
      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
    </svg>
  );
};

ArrowRight.defaultProps = {
  size: 24
};

ArrowRight.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string
};

export default ArrowRight;
