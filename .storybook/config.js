import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withTests } from "@storybook/addon-jest";

import results from "../jest-test-results.json";
import "./styles.css";

function loadStories() {
  require("../__stories__/index.js");
}

addDecorator(withKnobs);
addDecorator(
  withTests({
    results
  })
);
configure(loadStories, module);
