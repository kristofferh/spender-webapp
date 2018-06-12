import { makeRequest } from "shared/utils";

import {
  UPSERT_ITEM_REQUEST,
  UPSERT_ITEM_SUCCESS,
  UPSERT_ITEM_FAILURE,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE
} from "../constants";

export const upsertItemRequest = () => ({
  type: UPSERT_ITEM_REQUEST
});

export const upsertItemSuccess = item => ({
  type: UPSERT_ITEM_SUCCESS,
  item
});

export const upsertItemFailure = errors => ({
  type: UPSERT_ITEM_FAILURE,
  errors
});

export const fetchItemRequest = () => ({
  type: FETCH_ITEM_REQUEST
});

export const fetchItemSuccess = item => ({
  type: FETCH_ITEM_SUCCESS,
  item
});

export const fetchItemFailure = errors => ({
  type: FETCH_ITEM_FAILURE,
  errors
});

export const fetchItem = id => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(fetchItemRequest());
  const query = `
    query getItem($id: Int!) {
      item(id: $id) {
        description
        date
        amount
        tags {
          name
          color
        }
      }
    }
  `;
  makeRequest(JSON.stringify({ query: query, variables: { id: id } }))
    .then(json => {
      // Second dispatch: return results.
      return dispatch(fetchItemSuccess(json.item));
    })
    .catch(errors => {
      // Or dispatch errors.
      return dispatch(fetchItemFailure(errors));
    });
};

export const upsertItem = data => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(upsertItemRequest());
  const query = data.id
    ? `
      mutation editItem($id: Int!, $date: String, $amount: Float!, $description: String!, $tags: [TagInput]) {
        editItem(id: $id, date: $date, amount: $amount, description: $description, tags: $tags) {
          id
          date
          amount
          description
          tags {
            name
            description
            color
          }
      }
    }`
    : `
      mutation addItem($date: String, $amount: Float!, $description: String!, $tags: [TagInput]) {
        addItem(date: $date, amount: $amount, description: $description, tags: $tags) {
          id
          date
          amount
          description
          tags {
            name
            description
            color
          }
      }
    }`;

  return makeRequest(JSON.stringify({ query: query, variables: data }))
    .then(json => {
      // Second dispatch: return results.
      const { addItem, editItem } = json;
      return dispatch(upsertItemSuccess(addItem || editItem));
    })
    .catch(errors => {
      // Or dispatch errors.
      dispatch(upsertItemFailure(errors));
      throw errors;
    });
};
