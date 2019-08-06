import React from "react";
import { withFormik } from "formik";
import { createStore } from "redux";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import "jest-emotion";

import { Upsert } from "shared/features/upsert";

const spy = jest.fn();
const store = createStore(() => ({}));

const Decorated = withFormik({
  initialValues: { date: "July 12, 2008", amount: 10 }
})(Upsert);

describe("Create snapshot", () => {
  it("should render and match the snapshot for adding an item", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Decorated fetchItem={spy} onSubmit={spy} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Create snapshot", () => {
  it("should render and match the snapshot for editing an item", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Decorated onSubmit={spy} id={5} fetchItem={spy} fetchTags={spy} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
