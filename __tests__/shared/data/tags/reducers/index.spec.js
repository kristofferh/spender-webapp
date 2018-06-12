import reducer from "shared/data/tags/reducers";

import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE
} from "shared/data/tags/constants";

let state;

describe("tags reducer", () => {
  beforeEach(() => {
    state = {
      isFetching: false,
      tags: [],
      errors: {}
    };
  });

  it("should return default state for unknown type", () => {
    expect(reducer(state, { type: "SNAKES" })).toEqual({
      isFetching: false,
      tags: [],
      errors: {}
    });
  });

  it("should return request state", () => {
    expect(reducer(state, { type: FETCH_TAGS_REQUEST })).toEqual({
      isFetching: true,
      tags: [],
      errors: {}
    });
  });

  it("should return success state", () => {
    expect(
      reducer(state, {
        type: FETCH_TAGS_SUCCESS,
        tags: { tags: ["hello"] }
      })
    ).toEqual({
      tags: { tags: ["hello"] },
      isFetching: false,
      errors: {}
    });
  });

  it("should return error state", () => {
    expect(
      reducer(state, {
        type: FETCH_TAGS_FAILURE,
        errors: { error: "text" }
      })
    ).toEqual({
      isFetching: false,
      errors: { error: "text" },
      tags: []
    });
  });
});
