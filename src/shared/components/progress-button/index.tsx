import { Loader } from "@kristofferh/businesskit";
import React from "react";
import { white } from "shared/utils/styles";
import { Button, StateContainer } from "./styles";

export type ButtonState = "loading" | "error" | "success" | "";

export interface Props {
  className?: string;
  children: any;
  state?: ButtonState;
}

export const ProgressButton: React.FC<Props> = ({
  state,
  children,
  className
}) => (
  <Button state={state} className={className}>
    {children}
    <StateContainer>
      {state === "loading" ? (
        <Loader size={20} borderWidth={2} color={white} />
      ) : null}
    </StateContainer>
  </Button>
);

export default ProgressButton;
