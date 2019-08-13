import React from "react";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import { Field } from "formik";
import { FormikFormDecorator } from "./_decorators";
import { required } from "../src/shared/utils/validators";
import ActionButtons from "../src/shared/components/form-controls/action-buttons";
import { Input, Textarea } from "../src/shared/components/form-controls";
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
