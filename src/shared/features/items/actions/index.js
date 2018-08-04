import { makeRequest } from "shared/utils";

import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE
} from "../constants";

export const fetchItemsRequest = () => ({
  type: FETCH_ITEMS_REQUEST
});

export const fetchItemsSuccess = items => ({
  type: FETCH_ITEMS_SUCCESS,
  items
});

export const fetchItemsFailure = errors => ({
  type: FETCH_ITEMS_FAILURE,
  errors
});

export const fetchItems = data => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(fetchItemsRequest());
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
      return dispatch(fetchItemsSuccess(data.user.items));
    })
    .catch(errors => {
      // Or dispatch errors.
      return dispatch(fetchItemsFailure(errors));
    });
};
