import { USER_LOGGED_IN } from "../constants";

export default (
  state = {
    loggedIn: false,
  },
  actions
) => {
  switch (actions.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };
    default:
      return state;
  }
};
