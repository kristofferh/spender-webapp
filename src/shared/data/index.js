// Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

// App Imports
import edit from "shared/containers/edit/reducers";
import items from "shared/components/items/reducers";

// Root Reducer
export const rootReducer = combineReducers({
  edit,
  form: formReducer,
  list: items
});

// Store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
