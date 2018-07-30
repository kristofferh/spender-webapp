import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { USER_LOGOUT } from "./user/constants";
import items from "shared/features/items/reducers";
import requestToken from "shared/features/request-token/reducers";
import verifyToken from "shared/features/verify/reducers";
import item from "./item/reducers";
import tags from "./tags/reducers";

const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// App Reducer
export const appReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  item,
  list: items,
  requestToken,
  verifyToken,
  tags
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
  composeWithDevTools(applyMiddleware(middleware, thunk))
);
