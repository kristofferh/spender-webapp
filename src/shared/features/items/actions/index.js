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
  const query = `query fetchItems($limit: Int, $offset: Int, $order: String) {
    items(limit: $limit, offset: $offset, order: $order) {
      id,
      date,
      description,
      amount
    }
  }`;
  makeRequest(JSON.stringify({ query: query, variables: data }), true)
    .then(data => {
      // Second dispatch: return results.
      return dispatch(fetchItemsSuccess(data.items));
    })
    .catch(errors => {
      // Or dispatch errors.
      return dispatch(fetchItemsFailure(errors));
    });
};
