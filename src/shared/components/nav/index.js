import React from "react";
import PropTypes from "prop-types";

import Logo from "shared/components/logo";

import { white } from "shared/utils/styles";

import { Container, Inner, MenuItem } from "./styles";

const Nav = ({ authenticated }) =>
  authenticated ? (
    <Container>
      <Inner>
        <MenuItem color={white} />
        <Logo />
      </Inner>
    </Container>
  ) : null;

Nav.propTypes = {
  authenticated: PropTypes.bool
};

export default Nav;
