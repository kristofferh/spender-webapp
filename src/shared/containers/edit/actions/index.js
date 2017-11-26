import { makeRequest } from "shared/utils";

import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE
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
