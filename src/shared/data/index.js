import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { USER_LOGOUT } from "./user/constants";

import requestToken from "shared/features/request-token/reducers";
import verifyToken from "shared/features/verify/reducers";
import item from "./item/reducers";
import items from "./items/reducers";
import tags from "./tags/reducers";
import user from "./user/reducers";

// App Reducer
export const appReducer = combineReducers({
  form: formReducer,
  item,
  list: items,
  requestToken,
  verifyToken,
  tags,
  user
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    const { router } = state;
    state = { router };
  }
  return appReducer(state, action);
};

// Store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
