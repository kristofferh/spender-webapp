import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import "client/styles/app";

import App from "shared/index";
import { store } from "shared/data";

const history = createHistory();
const pageWrapper = document.getElementById("app-root");

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  pageWrapper
);
