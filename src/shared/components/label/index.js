import React from "react";
import PropTypes from "prop-types";

import { Container, Remove } from "./styles";

const Label = ({ children, isRemovable, removeCallback }) => (
  <Container>
    <span>{children}</span>
    {isRemovable && <Remove onClick={removeCallback}>x</Remove>}
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
