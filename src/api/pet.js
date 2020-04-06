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
      flag
    },
  });
}
