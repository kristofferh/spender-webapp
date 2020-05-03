import React, { useState } from "react";
import { ResizeObserverClass } from "../../../../../src/shared/components/observer/resize";

export const ResizeObserverExample = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const addItem = () => {
    setItems(items => [...items, `Item ${items.length + 1}`]);
  };

  const onResize = ({ height, width }) => {
    setHeight(height);
    setWidth(width);
  };

  return (
    <div>
      <button onClick={addItem}>Add item</button>
      <p>
        <code>{`height: ${height}; width: ${width}`}</code>
      </p>

      <ResizeObserverClass onResize={onResize}>
        {resizeRef => (
          <div ref={resizeRef}>
            <ul>
              {items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </ResizeObserverClass>
    </div>
  );
};
