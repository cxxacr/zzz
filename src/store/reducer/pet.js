import * as TYPES from "../actionTypes";
let INIT_STATE = {
  bannerData: null,
  listData: {
    total: 100,
    page: 1,
    limit: 10,
    data: [],
  },
  petType: "all",
  shoppingCart: {
    unpay: [],
    pay: [],
  },
  allState: true,
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
        state.listData.data =
          flag === "push" ? state.listData.data.concat(data) : data;
        state.listData.total = total;
        state.listData.limit = limit;
        state.listData.page = page;
        state.listData.flag = flag;
      }
      break;
    case TYPES.PET_QUREY_PAY:
      if (parseFloat(action.result.code) === 0) {
        state.shoppingCart.pay = action.result.data;
      }
      break;
    case TYPES.PET_QUREY_UNPAY:
      if (parseFloat(action.result.code) === 0) {
        state.shoppingCart.unpay = action.result.data;
        state.shoppingCart.unpay = state.shoppingCart.unpay.map((item) => {
          return { ...item, isChecked: true };
        });
        state.allState = true;
      }
      break;
    case TYPES.PET_HANDLE_CHECK:
      if (action.mode === "all") {
        console.log(11, action);
        state.allState = !state.allState;
        state.shoppingCart.unpay = state.shoppingCart.unpay.map((item) => {
          return { ...item, isChecked: state.allState };
        });
      } else {
        let item = state.shoppingCart.unpay.find((item) => {
          return parseFloat(item.id) === action.mode;
        });
        console.log(item,'look this this')
        item.isChecked = ! item.isChecked;
        console.log(item,'look this this')
        let finded = state.shoppingCart.unpay.find((item) => {
          return item.isChecked === false;
        });
        if (finded) {
          state.allState = false;
        } else {
          state.allState = true;
        }
        break;
      }
    default:
      break;
  }
  return state;
}
