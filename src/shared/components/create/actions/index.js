import { makeRequest } from "shared/utils";

import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE
} from "../constants";

export const addItemRequest = () => ({
  type: ADD_ITEM_REQUEST
});

export const addItemSuccess = item => ({
  type: ADD_ITEM_SUCCESS,
  item
});

export const addItemFailure = errors => ({
  type: ADD_ITEM_FAILURE,
  errors
});

export const addItem = data => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(addItemRequest());
  const query = `mutation ($date: String, $amount: Float!, $description: String!) {
      addItem(date: $date, amount: $amount, description: $description) { id, amount, description }
    }`;
  makeRequest(JSON.stringify({ query: query, variables: data }))
    .then(json => {
      // Second dispatch: return results.
      return dispatch(addItemSuccess(json.addItem));
    })
    .catch(errors => {
      // Or dispatch errors.
      return dispatch(addItemFailure(errors));
    });
};
