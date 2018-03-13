import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const IconArrow = ({ width, height, color, className, direction }) => {
  return (
    <svg
      className={classNames("icon-arrow", { [className]: className })}
      width={width}
      height={height}
      viewBox="0 0 48 48"
    >
      <g
        className="icon-arrow-group"
        fill={color}
        fillRule="evenodd"
        transform={direction === "right" ? "matrix(-1 0 0 1 48 0)" : null}
      >
        <path d="M41.9337087,23.2551266 L28.0578226,9.37924046 C27.5135384,8.83495629 27.5135384,7.95249729 28.0578226,7.40821313 C28.6021068,6.86392896 29.4845657,6.86392896 30.0288499,7.40821313 L47,24.3793632 L30.7685485,40.6108148 C30.2242643,41.1550989 29.3418053,41.1550989 28.7975211,40.6108148 C28.253237,40.0665306 28.253237,39.1840716 28.7975211,38.6397874 L41.3947284,26.0425801 L2.39372679,26.0425801 C1.62399274,26.0425801 1,25.4185874 1,24.6488534 C1,23.8791193 1.62399274,23.2551266 2.39372679,23.2551266 L41.9337087,23.2551266 Z" />
      </g>
    </svg>
  );
};

export const defaultProps = {
  width: 48,
  height: 48,
  color: "#000",
  direction: "right"
};

export const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  direction: PropTypes.oneOf(["left", "right"])
};

IconArrow.defaultProps = defaultProps;
IconArrow.propTypes = propTypes;

export default IconArrow;
