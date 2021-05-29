import { USER_LOGOUT, USER_LOGGED_IN, SET_CURRENT_USER } from "../constants";

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const userLoggedIn = () => ({
  type: USER_LOGGED_IN,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});
