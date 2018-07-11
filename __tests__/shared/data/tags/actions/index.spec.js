import {
  fetchTagsRequest,
  fetchTagsSuccess,
  fetchTagsFailure
} from "shared/data/tags/actions";

import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE
} from "shared/data/tags/constants";

describe("tags actions", () => {
  it("should initialize request", () => {
    expect(fetchTagsRequest()).toEqual({
      type: FETCH_TAGS_REQUEST
    });
  });

  it("should finish request successfully ", () => {
    expect(fetchTagsSuccess({ tags: ["hey"] })).toEqual({
      type: FETCH_TAGS_SUCCESS,
      tags: { tags: ["hey"] }
    });
  });

  it("should fail request", () => {
    expect(fetchTagsFailure({ error: "text" })).toEqual({
      type: FETCH_TAGS_FAILURE,
      errors: { error: "text" }
    });
  });
});
