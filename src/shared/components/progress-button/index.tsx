import React from "react";
import { Loader } from "shared/components/loader";
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
        <Loader
          size={20}
          borderWidth={4}
          color={white}
          backgroundColor={"transparent"}
          style={{ margin: 0 }}
        />
      ) : null}
    </StateContainer>
  </Button>
);

export default ProgressButton;