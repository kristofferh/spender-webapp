import { configure } from "@storybook/react";
import "./styles.css";

function loadStories() {
  require("../__stories__/index.js");
}

configure(loadStories, module);
