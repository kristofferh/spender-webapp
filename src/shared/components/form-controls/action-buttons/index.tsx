import React, { ReactNode } from "react";
import { ButtonState } from "shared/components/progress-button";
import {
  ButtonContainer,
  Container,
  ErrorContainer,
  PrimaryBtn,
  TextLink
} from "./styles";

type ActionButtonsProps = {
  error?: ReactNode;
  primaryActionLabel?: ReactNode;
  secondaryAction?: boolean;
  secondaryActionLabel?: ReactNode;
  secondaryActionCallback?: () => void;
  buttonState?: ButtonState;
};

const ActionButtons = ({
  primaryActionLabel = "Submit",
  secondaryAction,
  secondaryActionCallback,
  secondaryActionLabel,
  error,
  buttonState = ""
}: ActionButtonsProps) => (
  <Container>
    {error && <ErrorContainer>{error}</ErrorContainer>}
    <ButtonContainer>
      {secondaryAction && (
        <TextLink onClick={secondaryActionCallback}>
          {secondaryActionLabel}
        </TextLink>
      )}
      <PrimaryBtn state={buttonState}>{primaryActionLabel}</PrimaryBtn>
    </ButtonContainer>
  </Container>
);

export default ActionButtons;
