import reducer from "shared/data/item/reducers";

import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  UPSERT_ITEM_REQUEST,
  UPSERT_ITEM_SUCCESS,
  UPSERT_ITEM_FAILURE
} from "shared/data/item/constants";

let state;

describe("item reducer", () => {
  beforeEach(() => {
    state = {
      isFetching: false,
      isSubmitting: false,
      item: {},
      errors: {}
    };
  });

  it("should return default state for unknown type", () => {
    expect(reducer(state, { type: "SNAKES" })).toEqual({
      isFetching: false,
      isSubmitting: false,
      item: {},
      errors: {}
    });
  });

  it("should return request fetch state", () => {
    expect(reducer(state, { type: FETCH_ITEM_REQUEST })).toEqual({
      isFetching: true,
      isSubmitting: false,
      item: {},
      errors: {}
    });
  });

  it("should return success fetch state", () => {
    expect(
      reducer(state, {
        type: FETCH_ITEM_SUCCESS,
        item: { item: ["hello"] }
      })
    ).toEqual({
      item: { item: ["hello"] },
      isFetching: false,
      isSubmitting: false,
      errors: {}
    });
  });

  it("should return error fetch state", () => {
    expect(
      reducer(state, {
        type: FETCH_ITEM_FAILURE,
        errors: { error: "text" }
      })
    ).toEqual({
      isFetching: false,
      isSubmitting: false,
      errors: { error: "text" },
      item: {}
    });
  });

  it("should return request upsert state", () => {
    expect(reducer(state, { type: UPSERT_ITEM_REQUEST })).toEqual({
      isSubmitting: true,
      isFetching: false,
      item: {},
      errors: {}
    });
  });

  it("should return success upsert state", () => {
    expect(
      reducer(state, {
        type: UPSERT_ITEM_SUCCESS,
        item: { item: ["hello"] }
      })
    ).toEqual({
      item: { item: ["hello"] },
      isSubmitting: false,
      isFetching: false,
      errors: {}
    });
  });

  it("should return error upsert state", () => {
    expect(
      reducer(state, {
        type: UPSERT_ITEM_FAILURE,
        errors: { error: "text" }
      })
    ).toEqual({
      isSubmitting: false,
      isFetching: false,
      errors: { error: "text" },
      item: {}
    });
  });
});
