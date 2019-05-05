import React from "react";
import renderer from "react-test-renderer";

import Loader from "shared/components/loader";

describe("Create Loader snapshot", () => {
  it("should render and match the snapshot", () => {
    const tree = renderer.create(<Loader size={30} color="#ee99ee" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
