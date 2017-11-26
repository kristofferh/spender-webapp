import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE
} from "../constants";

export default (
  state = {
    isFetching: false,
    item: {},
    errors: {}
  },
  action
) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        item: action.item
      };
    case ADD_ITEM_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors
      };
    default:
      return state;
  }
};
