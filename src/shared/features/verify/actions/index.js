import { makeRequest } from "shared/utils";

import {
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE
} from "../constants";

export const verifyTokenRequest = () => ({
  type: VERIFY_TOKEN_REQUEST
});

export const verifyTokenSuccess = data => ({
  type: VERIFY_TOKEN_SUCCESS,
  token: data.token
});

export const verifyTokenFailure = errors => ({
  type: VERIFY_TOKEN_FAILURE,
  errors
});

export const verifyToken = data => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(verifyTokenRequest());
  const query = `
    mutation verifyToken($delivery:String!, $token:String!) {
      verifyToken(delivery: $delivery, token: $token) {
        token
      }
    }
  `;

  return makeRequest(JSON.stringify({ query: query, variables: data }), false)
    .then(data => {
      // Second dispatch: return results.
      return dispatch(verifyTokenSuccess(data.verifyToken));
    })
    .catch(errors => {
      // Or dispatch errors.
      dispatch(verifyTokenFailure(errors));
      throw errors;
    });
};
