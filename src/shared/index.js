import styled from "@emotion/styled";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import Nav from "./components/nav";
import { userLoggedIn } from "./data/user/actions";
import routes from "./routes";
import { RouteWithSubRoutes } from "./utils";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export class App extends Component {
  static propTypes = {
    userLoggedIn: PropTypes.func,
    loggedIn: PropTypes.bool
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <Container>
        <Nav authenticated={loggedIn} />
        <Switch>
          {routes.map((route, i) => {
            return (
              <RouteWithSubRoutes key={i} loggedIn={loggedIn} {...route} />
            );
          })}
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    ...state,
    loggedIn: user.loggedIn || Boolean(Cookies.get(SESSION_COOKIE))
  };
};

export default connect(mapStateToProps, { userLoggedIn })(App);
