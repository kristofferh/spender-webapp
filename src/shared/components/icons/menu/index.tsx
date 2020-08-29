import React from "react";
import { SVGIcon, SVGIconProps } from "shared/components/icons/_svg-icon";

const Menu: React.FC<SVGIconProps> = props => {
  return (
    <SVGIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </SVGIcon>
  );
};

export default Menu;
