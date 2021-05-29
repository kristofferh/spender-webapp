import { makeRequest } from "shared/utils";

import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
} from "../constants";

export const fetchTagsRequest = () => ({
  type: FETCH_TAGS_REQUEST,
});

export const fetchTagsSuccess = (tags) => ({
  type: FETCH_TAGS_SUCCESS,
  tags,
});

export const fetchTagsFailure = (errors) => ({
  type: FETCH_TAGS_FAILURE,
  errors,
});

export const fetchTags = (data) => (dispatch) => {
  dispatch(fetchTagsRequest());
  const query = `query fetchTags {
    user {
      tags {
        edges {
          node {
            name
            color
          }
        }
      }
    }
  }`;

  return makeRequest(JSON.stringify({ query: query, variables: data }))
    .then((data) => {
      // Second dispatch: return results.
      return dispatch(fetchTagsSuccess(data.user.tags));
    })
    .catch((errors) => {
      // Or dispatch errors.
      return dispatch(fetchTagsFailure(errors));
    });
};
