import {
  UPSERT_ITEM_REQUEST,
  UPSERT_ITEM_SUCCESS,
  UPSERT_ITEM_FAILURE,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE
} from "../constants";

export default (
  state = {
    isFetching: false,
    isSubmitting: false,
    item: {},
    errors: {}
  },
  action
) => {
  switch (action.type) {
    case UPSERT_ITEM_REQUEST:
      return {
        ...state,
        isSubmitting: true
      };
    case UPSERT_ITEM_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        item: action.item
      };
    case UPSERT_ITEM_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        errors: action.errors
      };
    case FETCH_ITEM_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        item: action.item
      };
    case FETCH_ITEM_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors
      };
    default:
      return state;
  }
};
