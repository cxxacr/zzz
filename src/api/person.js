import axios from "./index";

// 检测是否登录
export function checkLogin() {
  return axios.get("/personal/login");
}

// 退出登录
export function logOut(){
  return axios.get('/personal/out');
}

// 获取个人信息
export function getInfo(){
  return axios.get('/personal/info');
};

// 登录
export function login(payload){
  return axios.post('/personal/login',payload)
}

// 注册
export function register(payload){
  return axios.post('/personal/register',payload)
}