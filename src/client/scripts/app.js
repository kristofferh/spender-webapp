import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "shared/index";
import { store } from "shared/data";

import "client/styles/fonts/tiempos";
import "client/styles/app";

const pageWrapper = document.getElementById("app-root");

render(
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>,
  pageWrapper
);
