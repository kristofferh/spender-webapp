import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE
} from "../constants";

export default (
  state = {
    isFetching: false,
    items: {},
    errors: {}
  },
  action
) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.items
      };
    case FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors
      };
    default:
      return state;
  }
};
