import { makeRequest } from "shared/utils";

import {
  UPSERT_ITEM_REQUEST,
  UPSERT_ITEM_SUCCESS,
  UPSERT_ITEM_FAILURE,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE
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

export const fetchTagsRequest = () => ({
  type: FETCH_TAGS_REQUEST
});

export const fetchTagsSuccess = item => ({
  type: FETCH_TAGS_SUCCESS,
  item
});

export const fetchTagsFailure = errors => ({
  type: FETCH_TAGS_FAILURE,
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

export const fetchTags = data => dispatch => {
  dispatch(fetchTagsRequest());
  const query = `query fetchTags($limit: Int, $offset: Int, $order: String) {
    tags(limit: $limit, offset: $offset, order: $order) {
      id
      name
      description
      color
    }
  }`;
  makeRequest(JSON.stringify({ query: query, variables: data }))
    .then(data => {
      // Second dispatch: return results.
      return dispatch(fetchTagsSuccess(data.tags));
    })
    .catch(errors => {
      // Or dispatch errors.
      return dispatch(fetchTagsFailure(errors));
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
          }
      }
    }`;
  makeRequest(JSON.stringify({ query: query, variables: data }))
    .then(json => {
      // Second dispatch: return results.
      const { addItem, editItem } = json;
      console.log(addItem, editItem);
      return dispatch(upsertItemSuccess(addItem || editItem));
    })
    .catch(errors => {
      // Or dispatch errors.
      return dispatch(upsertItemFailure(errors));
    });
};
