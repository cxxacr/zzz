import * as TYPES from "../actionTypes";
let INIT_STATE = {
  bannerData: null,
  listData: {
    total: 100,
    page: 1,
    limit: 10,
    data: []
  },
  petType: 'all',
};

export default function pet(state = INIT_STATE, action) {
  state = JSON.parse(JSON.stringify(state));
  let payload = null;
  switch (action.type) {
    case TYPES.PET_BANNER_INFO:
      payload = action.payload;
      state.bannerData = payload.data;
      break;
    case TYPES.PET_LIST_INFO:
      let { total, limit, page, data, code } = action.result;
      let type = action.petType;
      let flag = action.flag;
      state.petType = type;
      if (parseFloat(code) === 0) {
        state.listData.data = flag === 'push' ? state.listData.data.concat(data) : data;
        state.listData.total = total;
        state.listData.limit = limit;
        state.listData.page = page;
        state.listData.flag = flag;
      }
      break;
  }
  return state;
}
