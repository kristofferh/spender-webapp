import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { Route } from "react-router-dom";

import App from "shared/index";
import { store } from "shared/data";

import "client/styles/fonts/tiempos";
import "client/styles/app";

const history = createHistory();
const pageWrapper = document.getElementById("app-root");

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route component={App} />
    </ConnectedRouter>
  </Provider>,
  pageWrapper
);
