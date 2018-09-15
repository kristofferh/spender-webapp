import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_PAGINATION_REQUEST,
  FETCH_ITEMS_PAGINATION_SUCCESS
} from "../constants";

export default (
  state = {
    isFetching: false,
    isPaginating: false,
    items: [],
    pageInfo: {},
    aggregate: {},
    aggregateTags: {},
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
    case FETCH_ITEMS_PAGINATION_REQUEST:
      return {
        ...state,
        isFetching: false,
        isPaginating: true
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isPaginating: false,
        items: action.items,
        pageInfo: action.pageInfo,
        aggregate: action.aggregate,
        aggregateTags: action.aggregateTags
      };
    case FETCH_ITEMS_PAGINATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isPaginating: false,
        items: state.items.concat(action.items),
        pageInfo: action.pageInfo
      };
    case FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isPaginating: false,
        errors: action.errors
      };
    default:
      return state;
  }
};
