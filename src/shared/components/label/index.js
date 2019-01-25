import React from "react";
import PropTypes from "prop-types";

import { white } from "shared/utils/styles";
import { Close } from "shared/components/icons";

import { Container, Inner, Remove } from "./styles";

const Label = ({ children, isRemovable, removeCallback }) => (
  <Container>
    <Inner>{children}</Inner>
    {isRemovable && (
      <Remove onClick={removeCallback}>
        <Close size={14} color={white} />
      </Remove>
    )}
  </Container>
);

Label.defaultProps = {
  removeCallback: () => {}
};

Label.propTypes = {
  children: PropTypes.any,
  isRemovable: PropTypes.bool,
  removeCallback: PropTypes.func
};

export default Label;
