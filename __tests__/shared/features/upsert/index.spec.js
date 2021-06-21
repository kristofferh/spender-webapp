import { withFormik } from "formik";
import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { createStore } from "redux";
import { Upsert } from "shared/features/upsert";

const spy = jest.fn();
const store = createStore(() => ({}));

jest.mock("react-router", () => ({
  useParams: jest.fn().mockReturnValue({ id: "123" }),
}));

const Decorated = withFormik({
  initialValues: { date: "July 12, 2008", amount: 10 },
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
          <Decorated onSubmit={spy} fetchItem={spy} fetchTags={spy} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
