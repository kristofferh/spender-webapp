import React from "react";
import PropTypes from "prop-types";

import { white } from "shared/utils/styles";
import { Close } from "shared/components/icons";

import { Container, Inner, Remove } from "./styles";

const Label = ({ children, isRemovable, removeProps }) => (
  <Container>
    <Inner>{children}</Inner>
    {isRemovable && (
      <Remove {...removeProps}>
        <Close size={14} color={white} />
      </Remove>
    )}
  </Container>
);

Label.propTypes = {
  children: PropTypes.any,
  isRemovable: PropTypes.bool,
  removeProps: PropTypes.object
};

export default Label;
