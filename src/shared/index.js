import React from "react";
import { Switch, Link } from "react-router-dom";

import { RouteWithSubRoutes } from "shared/utils";
import routes from "shared/routes";

const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/items">Items</Link>
    </nav>
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={i} {...route} />;
      })}
    </Switch>
  </div>
);

export default App;
