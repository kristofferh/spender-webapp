import React, { ReactNode } from "react";

import {
  Container,
  ButtonContainer,
  ErrorContainer,
  PrimaryBtn,
  TextLink
} from "./styles";

export interface ActionButtonsProps {
  error?: ReactNode;
  primaryActionLabel?: ReactNode;
  secondaryAction?: boolean;
  secondaryActionLabel?: ReactNode;
  secondaryActionCallback?: () => void;
}

const ActionButtons = ({
  primaryActionLabel = "Submit",
  secondaryAction,
  secondaryActionCallback,
  secondaryActionLabel,
  error
}: ActionButtonsProps) => (
  <Container>
    {error && <ErrorContainer>{error}</ErrorContainer>}
    <ButtonContainer>
      {secondaryAction && (
        <TextLink onClick={secondaryActionCallback}>
          {secondaryActionLabel}
        </TextLink>
      )}
      <PrimaryBtn type="submit">{primaryActionLabel}</PrimaryBtn>
    </ButtonContainer>
  </Container>
);

export default ActionButtons;
