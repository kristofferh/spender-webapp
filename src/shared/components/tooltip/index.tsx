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
import { Anchor, Content } from "./styles";

type Props = {
  content?: ReactNode;
  position: OverlayPlacement;
  anchorClassName?: string;
  id?: string;
  forcePosition?: boolean;
};

const ToolTip: React.FC<Props> = ({
  children,
  content,
  position = "top",
  id = htmlIdGenerator(),
  anchorClassName,
  forcePosition
}) => {
  const anchorRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [showToolTip, setShowToolTip] = useState(false);
  const [hasFocus, setFocus] = useState(false);
  const [tooltipStyles, setTooltipStyles] = useState<React.CSSProperties>();
  const [animateFrom, setAnimateFrom] = useState<OverlayPlacement>(position);

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
    <Anchor tabIndex={0}>{children}</Anchor>
  );

  const anchor = (
    <Anchor
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
    </Anchor>
  );

  const handleResize = () => {
    if (
      anchorRef &&
      anchorRef.current &&
      containerRef &&
      containerRef.current
    ) {
      const { position: actualPosition, left, top } = findOverlayPosition({
        anchor: anchorRef.current,
        overlay: containerRef.current,
        position,
        offset: 8,
        forcePosition
      });

      const windowWidth =
        document.documentElement.clientWidth || window.innerWidth;
      const useRightValue = windowWidth / 2 < left;

      const toolTipStyles = {
        top,
        left: useRightValue ? "auto" : left,
        right: useRightValue
          ? windowWidth - left - containerRef.current.offsetWidth
          : "auto"
      };
      setAnimateFrom(actualPosition);
      setTooltipStyles(toolTipStyles);
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
          animationDirection={animateFrom}
          ref={containerRef}
          style={tooltipStyles}
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
