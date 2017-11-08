import React from "react";
import { render } from "react-dom";

import "client/styles/app";

import Hi from "shared/components";

const pageWrapper = document.getElementById("app-root");

render(<Hi />, pageWrapper);
console.log("hi");
