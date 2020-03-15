import React, { useEffect, useRef, useState } from "react";
import { Container } from "./styles";

type Props = {
  direction?: "ltr" | "rtl";
  show?: boolean;
  className?: string;
  onClose?: () => void;
  maxWidth?: number | string;
};

const Panel: React.FC<Props> = ({
  children,
  direction,
  show,
  className,
  onClose,
  maxWidth
}) => {
  const [render, setRender] = useState(show);
  const panelRef = useRef(null);

  useEffect(() => {
    if (show) {
      setRender(true);
    }
  }, [show]);

  const handleAnimationEnd = (event: React.AnimationEvent) => {
    // There could be other things animating inside the panel so let's make
    // sure we only set render to be `false` when the panel itself has animated out.
    if (!show && event.target === panelRef.current!) {
      setRender(false);
      if (onClose) {
        onClose();
      }
    }
  };
  return render ? (
    <Container
      slideDirection={direction}
      ref={panelRef}
      onAnimationEnd={handleAnimationEnd}
      show={show}
      maxWidth={maxWidth}
      className={className}
    >
      {children}
    </Container>
  ) : null;
};

export default Panel;
