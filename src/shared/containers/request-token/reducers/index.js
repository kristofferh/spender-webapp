import {
  REQUEST_TOKEN_REQUEST,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE
} from "../constants";

export default (
  state = {
    isRequesting: false,
    errors: [],
    success: false
  },
  action
) => {
  switch (action.type) {
    case REQUEST_TOKEN_REQUEST:
      return {
        ...state,
        isRequesting: true
      };
    case REQUEST_TOKEN_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        success: true
      };
    case REQUEST_TOKEN_FAILURE:
      return {
        ...state,
        isRequesting: false,
        errors: action.errors
      };
    default:
      return state;
  }
};
