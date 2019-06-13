import React from "react";
import renderer from "react-test-renderer";

import Input from "shared/components/form-controls/input";

describe("Create Input snapshot", () => {
  it("should render and match no props snapshot", () => {
    const tree = renderer
      .create(<Input field={{ name: "test" }} form={{}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
