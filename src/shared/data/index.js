// Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

// App Imports
import upsert from "shared/containers/upsert/reducers";
import items from "shared/containers/items/reducers";
import requestToken from "shared/containers/request-token/reducers";
import verifyToken from "shared/containers/verify/reducers";

// Root Reducer
export const rootReducer = combineReducers({
  upsert,
  form: formReducer,
  list: items,
  requestToken,
  verifyToken
});

// Store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
