import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "react-emotion";
import PropTypes from "prop-types";

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  width: 100%;
`;

const Nav = ({ authenticated }) => (
  <Container>
    {authenticated ? (
      <Fragment>
        <Link to="/">Items</Link>
        <Link to="/logout">Logout</Link>
      </Fragment>
    ) : null}
  </Container>
);

Nav.propTypes = {
  authenticated: PropTypes.bool
};

export default Nav;
