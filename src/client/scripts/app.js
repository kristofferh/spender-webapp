import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "client/styles/app";

import App from "shared/index";
import { store } from "shared/data";

const pageWrapper = document.getElementById("app-root");

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  pageWrapper
);
