import {
  fetchItemRequest,
  fetchItemSuccess,
  fetchItemFailure,
  upsertItemRequest,
  upsertItemSuccess,
  upsertItemFailure
} from "shared/data/item/actions";

import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  UPSERT_ITEM_REQUEST,
  UPSERT_ITEM_SUCCESS,
  UPSERT_ITEM_FAILURE
} from "shared/data/item/constants";

describe("item actions", () => {
  it("should initialize fetch request", () => {
    expect(fetchItemRequest()).toEqual({
      type: FETCH_ITEM_REQUEST
    });
  });

  it("should finish request successfully ", () => {
    expect(
      fetchItemSuccess({
        user: { item: { amount: 10, description: "neat", tags: ["cool"] } }
      })
    ).toEqual({
      type: FETCH_ITEM_SUCCESS,
      user: {
        user: { item: { amount: 10, description: "neat", tags: ["cool"] } }
      }
    });
  });

  it("should fail request", () => {
    expect(fetchItemFailure({ error: "text" })).toEqual({
      type: FETCH_ITEM_FAILURE,
      errors: { error: "text" }
    });
  });

  it("should initialize upsert request", () => {
    expect(upsertItemRequest()).toEqual({
      type: UPSERT_ITEM_REQUEST
    });
  });

  it("should finish upsert request successfully ", () => {
    expect(
      upsertItemSuccess({
        item: { amount: 11, description: "neat", tags: ["cool", "sweet"] }
      })
    ).toEqual({
      type: UPSERT_ITEM_SUCCESS,
      item: {
        item: { amount: 11, description: "neat", tags: ["cool", "sweet"] }
      }
    });
  });

  it("should fail upsert request", () => {
    expect(upsertItemFailure({ error: "text" })).toEqual({
      type: UPSERT_ITEM_FAILURE,
      errors: { error: "text" }
    });
  });
});
