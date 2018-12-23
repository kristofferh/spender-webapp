import React from "react";
import PropTypes from "prop-types";

import { Menu } from "shared/components/icons";

import { white } from "shared/utils/styles";

import { Container, Inner } from "./styles";

const Nav = ({ authenticated }) =>
  authenticated ? (
    <Container>
      <Inner>
        <Menu color={white} />
      </Inner>
    </Container>
  ) : null;

Nav.propTypes = {
  authenticated: PropTypes.bool
};

export default Nav;
