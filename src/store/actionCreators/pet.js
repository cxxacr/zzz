import * as TYPES from "../actionTypes";
import {
  queryBannerInfo,
  queryPetList,
  queryShoppingCartInfo,
} from "../../api/pet";
const pet = {
  queryBannerInfo() {
    return {
      type: TYPES.PET_BANNER_INFO,
      payload: queryBannerInfo(),
    };
  },
  queryPetList(payload = {}) {
    let { limit = 10, page = 1, type = "all", flag = "push" } = payload;
    return async (dispatch) => {
      let result = await queryPetList({
        limit,
        page,
        type,
      });
      dispatch({
        type: TYPES.PET_LIST_INFO,
        result,
        flag,
        petType: type,
      });
    };
  },
  queryPay() {
    return async (dispatch) => {
      let result = await queryShoppingCartInfo(1);
      dispatch({
        type: TYPES.PET_QUREY_PAY,
        result,
      });
    };
  },
  queryUnPay() {
    return async (dispatch) => {
      let result = await queryShoppingCartInfo(0);
      dispatch({
        type: TYPES.PET_QUREY_UNPAY,
        result,
      });
    };
  },
  selectAll(mode) {
    console.log('selectAll函数触发')
    return {
      type: TYPES.PET_HANDLE_CHECK,
      mode,
    };
  },
};
export default pet;
