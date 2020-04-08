import axios from "./index";

// 获取pet轮播图
export function queryBannerInfo() {
  return axios.get("/pet/banner");
}

// 获取pet列表
export function queryPetList(payload = {}) {
  let { limit = 10, page = 1, type = "all", flag = "push" } = payload;
  return axios.get("/pet/list", {
    params: {
      limit,
      page,
      type,
      flag,
    },
  });
}

// 根据id获取pet详情
export function queryPetInfo(petId) {
  return axios.get("/pet/info", {
    params: {
      petId,
    },
  });
}

// 加入购物车
export function addShoppingCart(petId) {
  return axios.post("/store/add", {
    petId,
  });
}

// 移除购物车
export function removeShoppingCart(petId) {
  return axios.post("/store/remove", {
    petId,
  });
}

// 获取购物车信息
export function queryShoppingCartInfo(state = 0) {
  return axios.get("/store/info", {
    params: {
      state,
    },
  });
}

// 支付
export function payShopCart(storeID) {
  return axios.post("/store/pay", {
    storeID,
  });
}
