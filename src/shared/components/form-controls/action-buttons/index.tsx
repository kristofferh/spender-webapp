import React, { ReactNode } from "react";

import { Container, PrimaryBtn, TextLink } from "./styles";

export interface ActionButtonsProps {
  primaryActionLabel: ReactNode;
  secondaryAction: boolean;
  secondaryActionLabel: ReactNode;
  secondaryActionCallback: () => void;
}

const ActionButtons = ({
  primaryActionLabel = "Submit",
  secondaryAction,
  secondaryActionCallback,
  secondaryActionLabel
}: ActionButtonsProps) => (
  <Container>
    {secondaryAction && (
      <TextLink onClick={secondaryActionCallback}>
        {secondaryActionLabel}
      </TextLink>
    )}{" "}
    <PrimaryBtn type="submit">{primaryActionLabel}</PrimaryBtn>
  </Container>
);

export default ActionButtons;
