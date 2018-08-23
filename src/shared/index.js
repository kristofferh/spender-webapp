import React from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import styled from "react-emotion";
import PropTypes from "prop-types";

import { RouteWithSubRoutes } from "shared/utils";
import routes from "shared/routes";
import Nav from "shared/components/nav";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  position: relative;
  margin: ${({ center }) => (center ? "auto" : null)};
`;

export const App = ({ login }) => (
  <Container>
    <Nav authenticated={Boolean(Cookies.get(SESSION_COOKIE))} />
    <Content center={login}>
      <Switch>
        {routes.map((route, i) => {
          return <RouteWithSubRoutes key={i} {...route} />;
        })}
      </Switch>
    </Content>
  </Container>
);

App.propTypes = {
  login: PropTypes.bool
};

const mapStateToProps = state => {
  return { ...state, login: state.router.location.pathname === "/login" };
};

export default connect(mapStateToProps)(App);
