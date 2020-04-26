import classNames from "classnames";
import React, {
  cloneElement,
  isValidElement,
  ReactNode,
  useRef,
  useState
} from "react";
import Portal from "../portal";
import { Content } from "./styles";

type Props = {
  content?: ReactNode;
  position: "top" | "left" | "right" | "bottom";
  anchorClassName?: string;
};

const ToolTip: React.FC<Props> = ({
  children,
  content,
  position = "top",
  anchorClassName
}) => {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [showToolTip, setShowToolTip] = useState(false);
  const [hasFocus, setFocus] = useState(false);

  const handleMouseEnter = () => {
    setFocus(false);
    setShowToolTip(true);
  };

  const handleMouseLeave = () => {
    if (!hasFocus) {
      setShowToolTip(false);
    }
  };

  const handleFocus = () => {
    setFocus(true);
    setShowToolTip(true);
  };

  const handleBlur = () => {
    setFocus(false);
    setShowToolTip(false);
  };

  const child = isValidElement(children) ? (
    children
  ) : (
    <span tabIndex={0}>{children}</span>
  );

  const anchor = (
    <span
      ref={anchorRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames("tooltip-anchor", anchorClassName)}
    >
      {cloneElement(child, { onFocus: handleFocus, onBlur: handleBlur })}
    </span>
  );

  let tooltip;
  if (showToolTip && content) {
    tooltip = (
      <Portal>
        <Content className="tooltip-content">{content}</Content>
      </Portal>
    );
  }

  return (
    <>
      {anchor}
      {tooltip}
    </>
  );
};

export default ToolTip;
