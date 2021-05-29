import {
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE,
} from "../constants";

export default (
  state = {
    isRequesting: false,
    errors: [],
    token: null,
  },
  action
) => {
  switch (action.type) {
    case VERIFY_TOKEN_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        token: action.token,
      };
    case VERIFY_TOKEN_FAILURE:
      return {
        ...state,
        isRequesting: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};
