import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { USER_LOGOUT } from "shared/containers/logout/constants";
import upsert from "shared/containers/upsert/reducers";
import items from "shared/containers/items/reducers";
import requestToken from "shared/containers/request-token/reducers";
import verifyToken from "shared/containers/verify/reducers";

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// App Reducer
export const appReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  upsert,
  list: items,
  requestToken,
  verifyToken
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
