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
export const makeRequest = search => {
  return fetch(`http://localhost:3000?query=${search}`).then(response => {
    return response.json();
  });
};

export const fetchResults = search => dispatch => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(addItemRequest());

  makeRequest(search)
    .then(json => {
      // Second dispatch: return results
      return dispatch(addItemSuccess(json));
    })
    .catch(errors => {
      return dispatch(addItemFailure(errors));
    });
};
