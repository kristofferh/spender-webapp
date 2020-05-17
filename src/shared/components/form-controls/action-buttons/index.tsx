import React, { ReactNode } from "react";
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
};

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
      <PrimaryBtn>{primaryActionLabel}</PrimaryBtn>
    </ButtonContainer>
  </Container>
);

export default ActionButtons;
