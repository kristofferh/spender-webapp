import React from "react";

import renderer from "react-test-renderer";

import { Create } from "shared/components/create";

describe("Create snapshot", () => {
  it("should render and match the snapshot", () => {
    const tree = renderer.create(<Create />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
