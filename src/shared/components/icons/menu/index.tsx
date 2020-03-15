import React from "react";

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

const Menu: React.FC<Props> = ({ className, color, size, ...svgProps }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...svgProps}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
};

Menu.defaultProps = {
  size: 24
};

export default Menu;
