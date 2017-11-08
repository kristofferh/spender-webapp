import React from "react";
import { render } from "react-dom";

import "client/styles/app";

import App from "shared/components";

const pageWrapper = document.getElementById("app-root");

render(<App />, pageWrapper);
