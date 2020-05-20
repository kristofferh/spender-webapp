import { boolean, select, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import { Field } from "formik";
import React from "react";
import { Input, Textarea } from "../src/shared/components/form-controls";
import ActionButtons from "../src/shared/components/form-controls/action-buttons";
import Loader from "../src/shared/components/loader";
import Portal from "../src/shared/components/portal";
import { ProgressButton } from "../src/shared/components/progress-button";
import ToolTip from "../src/shared/components/tooltip";
import { required } from "../src/shared/utils/validators";
import { ResizeObserverExample } from "./shared/components/observer/resize";
import { FormikFormDecorator } from "./_decorators";

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
  });

storiesOf("Form Controls", module)
  .addParameters({
    jest: ["components/form-controls/input/index.tsx"]
  })
  .addDecorator(
    FormikFormDecorator({ mapPropsToValues: () => ({ input: "" }) })
  )
  .add("Input", () => {
    const label = text("label", "Label");
    const require = boolean("required", true);
    const placeholder = text("placeholder", "Type something here");
    return (
      <Field
        name="input"
        component={Input}
        required={require}
        label={label}
        placeholder={placeholder}
        validate={required}
      />
    );
  });

storiesOf("Form Controls", module)
  .addDecorator(
    FormikFormDecorator({ mapPropsToValues: () => ({ textarea: "" }) })
  )
  .add("Textarea", () => {
    const label = text("label", "Label");
    const require = boolean("required", true);
    const placeholder = text("placeholder", "Type something here");
    return (
      <Field
        name="textarea"
        component={Textarea}
        required={require}
        label={label}
        placeholder={placeholder}
        validate={required}
      />
    );
  });

storiesOf("Loader", module).add("Loader", () => <Loader />);

storiesOf("Progress Button", module).add("Progress Button", () => {
  const state = select("state", {
    "": "default",
    loading: "loading",
    error: "error",
    success: "success"
  });
  return (
    <div style={{ width: 200 }}>
      <ProgressButton state={state}>Progress</ProgressButton>
    </div>
  );
});

storiesOf("Portal", module).add("Portal", () => <Portal>Portal</Portal>);

storiesOf("ToolTip", module).add("ToolTip", () => {
  const placements = {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left"
  };
  const position = select("position", placements, "top");
  const forcePosition = boolean("force position", false);
  return (
    <>
      <div style={{ margin: 10 }}>
        <ToolTip
          forcePosition={forcePosition}
          content={"Great stuff"}
          position={position}
        >
          Tight
        </ToolTip>
      </div>
      <div style={{ margin: 100 }}>
        <ToolTip
          forcePosition={forcePosition}
          content={
            <div>
              Amazing <br /> awesome
            </div>
          }
          position={position}
        >
          hover me
        </ToolTip>
        <div>
          is this good?{" "}
          <ToolTip
            forcePosition={forcePosition}
            content={"cool"}
            position={position}
          >
            <div>hover me too</div>
          </ToolTip>
        </div>
      </div>
    </>
  );
});

storiesOf("Observer", module).add("ResizeObserver", () => (
  <ResizeObserverExample />
));
