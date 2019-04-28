import React from "react";
import PropTypes from "prop-types";

import { Container, PrimaryBtn, TextLink } from "./styles";

const ActionButtons = ({
  primaryActionLabel,
  secondaryAction,
  secondaryActionLabel,
  secondaryActionCallback
}) => (
  <Container>
    {secondaryAction && (
      <TextLink onClick={secondaryActionCallback}>
        {secondaryActionLabel}
      </TextLink>
    )}{" "}
    <PrimaryBtn type="submit">{primaryActionLabel}</PrimaryBtn>
  </Container>
);

ActionButtons.defaultProps = {
  primaryActionLabel: "Submit"
};

ActionButtons.propTypes = {
  primaryActionLabel: PropTypes.node,
  secondaryAction: PropTypes.bool,
  secondaryActionLabel: PropTypes.node,
  secondaryActionCallback: PropTypes.func
};

export default ActionButtons;
