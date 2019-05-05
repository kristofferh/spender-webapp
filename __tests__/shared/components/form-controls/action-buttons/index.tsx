import React from "react";
import renderer from "react-test-renderer";

import ActionButtons from "shared/components/form-controls/action-buttons";

describe("Create ActionButtons snapshot", () => {
  it("should render and match no props snapshot", () => {
    const tree = renderer.create(<ActionButtons />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render and match non-default primary label snapshot", () => {
    const tree = renderer
      .create(<ActionButtons primaryActionLabel="Next" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render and match a secondary action snapshot", () => {
    const tree = renderer
      .create(
        <ActionButtons secondaryAction={true} secondaryActionLabel="Delete" />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
