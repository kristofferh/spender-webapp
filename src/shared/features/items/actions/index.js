import { makeRequest } from "shared/utils";

import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_PAGINATION_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_PAGINATION_SUCCESS
} from "../constants";

export const fetchItemsRequest = pagination => ({
  type: pagination ? FETCH_ITEMS_PAGINATION_REQUEST : FETCH_ITEMS_REQUEST
});

export const fetchItemsSuccess = (json, pagination) => {
  return {
    type: pagination ? FETCH_ITEMS_PAGINATION_SUCCESS : FETCH_ITEMS_SUCCESS,
    items: json.edges,
    pageInfo: json.pageInfo
  };
};

export const fetchItemsFailure = errors => ({
  type: FETCH_ITEMS_FAILURE,
  errors
});

export const fetchItems = (data, pagination) => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(fetchItemsRequest(pagination));
  const query = `query user($first: Int, $after: String) {
    user {
      items(first: $first, after: $after) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            date
            description
            amount
            tags {
              edges {
                node {
                  id
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  }`;
  makeRequest(JSON.stringify({ query: query, variables: data }), true)
    .then(data => {
      // Second dispatch: return results.
      console.log("success", data);
      return dispatch(fetchItemsSuccess(data.user.items, pagination));
    })
    .catch(errors => {
      // Or dispatch errors.
      return dispatch(fetchItemsFailure(errors));
    });
};
