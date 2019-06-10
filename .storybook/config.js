import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import "./styles.css";

function loadStories() {
  require("../__stories__/index.js");
}

addDecorator(withKnobs);
configure(loadStories, module);
