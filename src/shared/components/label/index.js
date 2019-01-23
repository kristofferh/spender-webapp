import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";

const Label = ({ children }) => <Container>{children}</Container>;

Label.propTypes = {
  children: PropTypes.any
};

export default Label;
