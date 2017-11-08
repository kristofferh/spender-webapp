import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "client/styles/app";

import App from "shared/components";

const pageWrapper = document.getElementById("app-root");

render(
  <Router>
    <App />
  </Router>,
  pageWrapper
);
