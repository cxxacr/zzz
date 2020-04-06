import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reduxLogger from "redux-logger";
import reduxPromise from "redux-promise";
import reducer from "./reducer";

const store = createStore(
  reducer,
  applyMiddleware(reduxThunk, reduxLogger, reduxPromise)
);

export default store;
