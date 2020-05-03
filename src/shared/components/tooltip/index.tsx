import classNames from "classnames";
import React, {
  cloneElement,
  isValidElement,
  ReactNode,
  useRef,
  useState
} from "react";
import { findOverlayPosition, OverlayPlacement } from "shared/utils/dom";
import { htmlIdGenerator } from "shared/utils/strings";
import { ResizeObserverClass as ResizeObserver } from "../observer/resize";
import Portal from "../portal";
import { Content } from "./styles";

type Props = {
  content?: ReactNode;
  position: OverlayPlacement;
  align?: OverlayPlacement;
  anchorClassName?: string;
  id?: string;
};

const ToolTip: React.FC<Props> = ({
  children,
  content,
  position = "top",
  align,
  id = htmlIdGenerator(),
  anchorClassName
}) => {
  const anchorRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);
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
      {cloneElement(child, {
        onFocus: handleFocus,
        onBlur: handleBlur,
        ...(showToolTip && { "aria-describedby": id })
      })}
    </span>
  );

  const handleResize = () => {
    if (
      anchorRef &&
      anchorRef.current &&
      containerRef &&
      containerRef.current
    ) {
      findOverlayPosition({
        anchor: anchorRef.current,
        overlay: containerRef.current,
        position,
        align
      });
    }
  };

  let tooltip;
  if (showToolTip && content) {
    tooltip = (
      <Portal>
        <Content
          className="tooltip-content"
          id={id}
          role="tooltip"
          ref={containerRef}
        >
          <ResizeObserver onResize={handleResize}>
            {resizeRef => <div ref={resizeRef}>{content}</div>}
          </ResizeObserver>
        </Content>
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
