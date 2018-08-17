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
      isDeleting: false,
      item: {},
      user: {},
      errors: {}
    };
  });

  it("should return default state for unknown type", () => {
    expect(reducer(state, { type: "SNAKES" })).toEqual({
      isFetching: false,
      isSubmitting: false,
      isDeleting: false,
      item: {},
      user: {},
      errors: {}
    });
  });

  it("should return request fetch state", () => {
    expect(reducer(state, { type: FETCH_ITEM_REQUEST })).toEqual({
      isFetching: true,
      isSubmitting: false,
      isDeleting: false,
      item: {},
      errors: {},
      user: {}
    });
  });

  it("should return success fetch state", () => {
    expect(
      reducer(state, {
        type: FETCH_ITEM_SUCCESS,
        user: { item: ["hello"] }
      })
    ).toEqual({
      user: { item: ["hello"] },
      item: {},
      isFetching: false,
      isSubmitting: false,
      isDeleting: false,
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
      isDeleting: false,
      errors: { error: "text" },
      item: {},
      user: {}
    });
  });

  it("should return request upsert state", () => {
    expect(reducer(state, { type: UPSERT_ITEM_REQUEST })).toEqual({
      isSubmitting: true,
      isFetching: false,
      isDeleting: false,
      item: {},
      user: {},
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
      isDeleting: false,
      errors: {},
      user: {}
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
      isDeleting: false,
      errors: { error: "text" },
      item: {},
      user: {}
    });
  });
});
