import { combineReducers } from "redux";
import person from "./person";
import pet from "./pet";

const reducer = combineReducers({
  person,
  pet,
});
export default reducer;
