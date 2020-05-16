import React from "react";
import { Button } from "./styles";

interface Props extends HTMLButtonElement {
  state?: "loading" | "error" | "success" | "";
}

export const ProgressButton: React.FC<Props> = ({ state, children }) => (
  <Button>{children}</Button>
);

export default ProgressButton;
