import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE
} from "../constants";

export const addItemRequest = () => ({
  type: ADD_ITEM_REQUEST
});

export const addItemSuccess = data => ({
  type: ADD_ITEM_SUCCESS,
  data
});

export const addItemFailure = errors => ({
  type: ADD_ITEM_FAILURE,
  errors
});

// Make call to the API.
// @todo: move this to utils.
export const makeRequest = query => {
  return fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: query
  }).then(response => {
    return response.json();
  });
};

export const addItem = data => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(addItemRequest());
  const query =
    "mutation ($date: String, $amount: Float!, $description: String!) { addItem(date: $date, amount: $amount, description: $description) { id }}";
  makeRequest(JSON.stringify({ query: query, variables: data }))
    .then(json => {
      // Second dispatch: return results.
      return dispatch(addItemSuccess(json));
    })
    .catch(errors => {
      // Or dispatch errors.
      return dispatch(addItemFailure(errors));
    });
};
