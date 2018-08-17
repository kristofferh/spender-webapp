import { makeRequest } from "shared/utils";

import {
  UPSERT_ITEM_REQUEST,
  UPSERT_ITEM_SUCCESS,
  UPSERT_ITEM_FAILURE,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE
} from "../constants";

const TAG_FRAGMENT = `
  fragment tag on Tag {
    name
    color
  }
`;

const ITEM_FRAGMENT = `
  fragment item on Item {
    date
    amount
    description
  }
`;

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

export const fetchItemSuccess = user => ({
  type: FETCH_ITEM_SUCCESS,
  user
});

export const fetchItemFailure = errors => ({
  type: FETCH_ITEM_FAILURE,
  errors
});

export const deleteItemRequest = () => ({
  type: DELETE_ITEM_REQUEST
});

export const deleteItemSuccess = item => ({
  type: DELETE_ITEM_SUCCESS,
  item
});

export const deleteItemFailure = errors => ({
  type: DELETE_ITEM_FAILURE,
  errors
});

export const fetchItem = id => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(fetchItemRequest());
  const query = `
    query getItem($id: ID!) {
      user {
        item(id: $id) {
          ...item
          tags {
            edges {
              node {
                ...tag
              }
            }
          }
        }
        tags {
          edges {
            node {
              ...tag
            }
          }
        }
      }
    }
    ${ITEM_FRAGMENT}
    ${TAG_FRAGMENT}
  `;
  return makeRequest(JSON.stringify({ query: query, variables: { id: id } }))
    .then(json => {
      // Second dispatch: return results.
      return dispatch(fetchItemSuccess(json.user));
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
      mutation editItem($input: EditItemInput!) {
        editItem(input: $input) {
          item {
            id
            ...item
            tags {
              edges {
                node {
                  ...tag
                }
              }
            }
          }
        }
      }
      ${ITEM_FRAGMENT}
      ${TAG_FRAGMENT}
      `
    : `
      mutation addItem($input: AddItemInput!) {
        addItem(input: $input) {
          item {
            id
            ...item
            tags {
              edges {
                node {
                  ...tag
                }
              }
            }
          }
        }
      }
      ${ITEM_FRAGMENT}
      ${TAG_FRAGMENT}
      `;

  return makeRequest(
    JSON.stringify({ query: query, variables: { input: data } })
  )
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

export const deleteItem = id => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(deleteItemRequest());
  const query = `
    mutation removeItem($id: ID!) {
      removeItem(id: $id) {
        id
      }
    }
  `;
  return makeRequest(JSON.stringify({ query: query, variables: { id: id } }))
    .then(json => {
      // Second dispatch: return results.
      return dispatch(deleteItemSuccess(json.item));
    })
    .catch(errors => {
      // Or dispatch errors.
      return dispatch(deleteItemFailure(errors));
    });
};
