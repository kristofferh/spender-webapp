import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Menu } from "shared/components/icons";

import { white } from "shared/utils/styles";

import { Container, Add, Desktop, Mobile } from "./styles";

const Nav = ({ authenticated }) =>
  authenticated ? (
    <Container>
      <Mobile>
        <Menu color={white} />
      </Mobile>
      <Desktop>
        <Link to="/">Items</Link>
        <Add to="/items/create">Add Item</Add>
        <Link to="/logout">Logout</Link>
      </Desktop>
    </Container>
  ) : null;

Nav.propTypes = {
  authenticated: PropTypes.bool
};

export default Nav;
