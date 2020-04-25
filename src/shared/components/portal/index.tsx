import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  node?: HTMLElement;
};

const Portal: React.FC<Props> = ({ children, node }) => {
  const portalNode = useRef(document.createElement("div"));

  useEffect(() => {
    if (node) {
      node.appendChild(portalNode.current);
    } else {
      document.body.appendChild(portalNode.current);
    }
    return () => {
      portalNode.current.remove();
    };
  }, [node]);

  return createPortal(children, portalNode.current);
};

export default Portal;
