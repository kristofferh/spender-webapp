import React from "react";
import { reduxForm } from "redux-form";
import { createStore } from "redux";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { Edit } from "shared/containers/edit";

const spy = jest.fn();
const store = createStore(() => ({}));

const Decorated = reduxForm({ form: "testForm" })(Edit);

describe("Create snapshot", () => {
  it("should render and match the snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Decorated onSubmit={spy} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
