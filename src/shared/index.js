import React, { Component } from "react";
import { Switch } from "react-router-dom";
import Cookies from "js-cookie";

import { RouteWithSubRoutes } from "shared/utils";
import routes from "shared/routes";

import Nav from "shared/components/nav";

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav authenticated={Boolean(Cookies.get(SESSION_COOKIE))} />
        <Switch>
          {routes.map((route, i) => {
            return <RouteWithSubRoutes key={i} {...route} />;
          })}
        </Switch>
      </div>
    );
  }
}
