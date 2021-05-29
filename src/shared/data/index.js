import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import requestToken from "shared/features/request-token/reducers";
import verifyToken from "shared/features/verify/reducers";
import item from "./item/reducers";
import items from "./items/reducers";
import profile from "./profile/reducers";
import tags from "./tags/reducers";
import { USER_LOGOUT } from "./user/constants";
import user from "./user/reducers";

// App Reducer
export const appReducer = combineReducers({
  item,
  list: items,
  requestToken,
  verifyToken,
  tags,
  user,
  profile,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = {};
  }
  return appReducer(state, action);
};

// Store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
