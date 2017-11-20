// Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

// App Imports
import create from "shared/components/create/reducers";
import items from "shared/components/items/reducers";

// Root Reducer
export const rootReducer = combineReducers({
  create,
  list: items
});

// Store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
