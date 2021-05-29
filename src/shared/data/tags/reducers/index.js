import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
} from "../constants";

export default (
  state = {
    isFetching: false,
    tags: [],
    errors: {},
  },
  action
) => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tags: action.tags,
      };
    case FETCH_TAGS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};
