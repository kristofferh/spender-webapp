import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE
} from "../constants";

export default (
  state = {
    isFetching: false,
    item: {},
    errors: []
  },
  action
) => {
  switch (action.type) {
    case REQUEST_RESULTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_RESULTS:
      return Object.assign({}, state, {
        isFetching: false,
        tracks: action.tracks
      });
    default:
      return state;
  }
};
