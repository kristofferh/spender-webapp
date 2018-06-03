import React, { Component } from "react";
import { Switch, Link } from "react-router-dom";

import { RouteWithSubRoutes } from "shared/utils";
import routes from "shared/routes";

export default class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/items">Items</Link>
          <Link to="/logout">Logout</Link>
        </nav>
        <Switch>
          {routes.map((route, i) => {
            return <RouteWithSubRoutes key={i} {...route} />;
          })}
        </Switch>
      </div>
    );
  }
}
