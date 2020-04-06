import * as TYPES from "../actionTypes";
import { getInfo } from "../../api/person";
const person = {
  queryInfo() {
    return {
      type: TYPES.PERSON_QUERY_INFO,
      payload: getInfo(),
    };
  },
};
export default person;
