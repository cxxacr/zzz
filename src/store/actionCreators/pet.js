import * as TYPES from "../actionTypes";
import { queryBannerInfo, queryPetList } from "../../api/pet";
const pet = {
  queryBannerInfo() {
    return {
      type: TYPES.PET_BANNER_INFO,
      payload: queryBannerInfo(),
    };
  },
  queryPetList(payload={}) {
    let {limit = 10, page = 1, type = 'all', flag = 'push'} = payload;
    return async (dispatch) => {
    let result = await queryPetList({
            limit,
            page,
            type
    });
      dispatch({
        type: TYPES.PET_LIST_INFO,
        result,
        flag,
        petType:type
      });
    };
  },
};
export default pet;
