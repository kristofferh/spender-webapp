import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import { RouteWithSubRoutes } from "./utils";
import routes from "./routes";
import Nav from "./components/nav";

import { userLoggedIn } from "./data/user/actions";

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

export class App extends Component {
  static propTypes = {
    loginPage: PropTypes.bool,
    userLoggedIn: PropTypes.func,
    loggedIn: PropTypes.bool
  };

  render() {
    const { loginPage, loggedIn } = this.props;
    return (
      <Container>
        <Nav authenticated={loggedIn} />
        <Content center={loginPage}>
          <Switch>
            {routes.map((route, i) => {
              return (
                <RouteWithSubRoutes key={i} loggedIn={loggedIn} {...route} />
              );
            })}
          </Switch>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { router, user } = state;
  return {
    ...state,
    loginPage: router.location.pathname === "/login",
    loggedIn: user.loggedIn || Boolean(Cookies.get(SESSION_COOKIE))
  };
};

export default connect(
  mapStateToProps,
  { userLoggedIn }
)(App);
