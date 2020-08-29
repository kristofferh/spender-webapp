import React, { SVGAttributes } from "react";

export interface SVGIconProps extends SVGAttributes<SVGElement> {
  color?: string;
  className?: string;
}

export const SVGIcon: React.FC<SVGIconProps> = ({
  width = 24,
  height = 24,
  viewBox = "0 0 24 24",
  className,
  color,
  children,
  ...rest
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox={viewBox}
    fill={color}
    {...rest}
  >
    {children}
  </svg>
);
