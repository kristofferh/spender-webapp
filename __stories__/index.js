import React from "react";
import { storiesOf } from "@storybook/react";

import ActionButtons from "../src/shared/components/form-controls/action-buttons";
import { Input } from "../src/shared/components/form-controls/input";
import Loader from "../src/shared/components/loader";

storiesOf("Form Controls", module)
  .add("Action Buttons", () => <ActionButtons />)
  .add("Input", () => <Input />);

storiesOf("Loader", module).add("Loader", () => <Loader />);
