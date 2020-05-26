import { Actions } from "../actions";
import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS
} from "../constants";

export default (
  state = {
    isFetching: false,
    isSubmitting: false,
    profile: {
      avatar: "",
      firstName: "",
      lastName: ""
    },
    errors: {}
  },
  action: Actions
) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isSubmitting: true
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        profile: action.profile
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        errors: action.errors
      };
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: action.profile
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        errors: action.errors
      };
    default:
      return state;
  }
};
