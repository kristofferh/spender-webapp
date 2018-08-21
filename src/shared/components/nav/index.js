import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Container, Add } from "./styles";

const Nav = ({ authenticated }) =>
  authenticated ? (
    <Container>
      <Link to="/">Items</Link>
      <Add to="/items/create">Add Item</Add>
      <Link to="/logout">Logout</Link>
    </Container>
  ) : null;

Nav.propTypes = {
  authenticated: PropTypes.bool
};

export default Nav;
