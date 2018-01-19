// Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

// App Imports
import upsert from "shared/containers/upsert/reducers";
import items from "shared/containers/items/reducers";

// Root Reducer
export const rootReducer = combineReducers({
  upsert,
  form: formReducer,
  list: items
});

// Store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
