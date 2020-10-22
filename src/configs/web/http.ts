/* eslint-disable */
import Vue from 'vue'
import axios, { AxiosInstance } from 'axios'
import router from '../router'
import CONSTANT from '../constant'
import { storage } from '../storage'

const http: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 30,
  withCredentials: true,
  // (一) 当前端配置withCredentials=true时, 后端配置Access-Control-Allow-Origin不能为*, 必须是相应地址
  // (二) 当配置withCredentials=true时, 后端需配置Access-Control-Allow-Credentials
  // (三) 当前端配置请求头时, 后端需要配置Access-Control-Allow-Headers为对应的请求头集合
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(
  (config: any) => {
    // config.headers['token'] = Vue.cookie.get('token')
    const token: any = storage.getItem(CONSTANT.STORAGE_OAUTH2_TOKEN_INFO)

    if (token) {
      config.headers[
        CONSTANT.OAUTH2_AUTHORIZATION_HEADER
      ] = `${token.token_type} ${token.access_token}`
    } else {
      // router.push({ name: CONSTANT.PAGE_LOGIN })
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 */
http.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    // token 过期或权限变更
    if (error.response && error.response.status === 401) {
      // router.push({ name: CONSTANT.PAGE_LOGIN })
    }
    // 权限
    if (error.response && error.response.status === 403) {
      router.push({ name: CONSTANT.PAGE_403 })
    }
    // 服务器错误
    if (error.response && error.response.status === 500) {
      router.push({ name: CONSTANT.PAGE_500 })
    }
    // 404错误不全局处理
    if (error.response && error.response.status === 404) {
      return Promise.reject(error)
    }
    Vue.prototype.$message.error(error.message)
    return Promise.reject(error)
  }
)

export default http
