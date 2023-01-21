import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

export default store;
