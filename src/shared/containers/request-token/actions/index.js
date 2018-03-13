import { makeRequest } from "shared/utils";

import {
  REQUEST_TOKEN_REQUEST,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE
} from "../constants";

export const requestTokenRequest = () => ({
  type: REQUEST_TOKEN_REQUEST
});

export const requestTokenSuccess = () => ({
  type: REQUEST_TOKEN_SUCCESS
});

export const requestTokenFailure = errors => ({
  type: REQUEST_TOKEN_FAILURE,
  errors
});

export const requestToken = data => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(requestTokenRequest());
  const query = `
    mutation requestToken($delivery:String!, $deliveryType:String) {
      requestNewToken(delivery: $delivery, deliveryType: $deliveryType) {
        success
        token
      }
    }
  `;

  makeRequest(JSON.stringify({ query: query, variables: data }))
    .then(() => {
      // Second dispatch: return results.
      return dispatch(requestTokenSuccess());
    })
    .catch(errors => {
      // Or dispatch errors.
      return dispatch(requestTokenFailure(errors));
    });
};
