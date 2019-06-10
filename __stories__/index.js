import React from "react";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import ActionButtons from "../src/shared/components/form-controls/action-buttons";
import { Input } from "../src/shared/components/form-controls/input";
import Loader from "../src/shared/components/loader";

storiesOf("Form Controls", module)
  .addParameters({
    jest: ["components/form-controls/action-buttons/index.tsx"]
  })
  .add("Action Buttons", () => {
    const primaryActionLabel = text("primaryActionLabel", "Send");
    const secondaryAction = boolean("secondaryAction", false);
    const secondaryActionLabel = text("seconaryActionLabel", "Cancel");
    return (
      <ActionButtons
        secondaryAction={secondaryAction}
        secondaryActionLabel={secondaryActionLabel}
        primaryActionLabel={primaryActionLabel}
      />
    );
  })
  .add("Input", () => <Input />);

storiesOf("Loader", module).add("Loader", () => <Loader />);
