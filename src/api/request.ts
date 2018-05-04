/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 12:05:37
 * @modify date 2018-01-29 10:26:16
 * @desc [axios改造]
 */

import axios from 'axios'
import appConfig from '@/appConfig'

declare global {
  interface Window {
    oneAjax: any
  }
}

// 创建axios实例
const service = axios.create({
  baseURL: appConfig.baseUrl,
  timeout: 10 * 1000,
  withCredentials: true
})
const CancelToken = axios.CancelToken
let cancel: any

// request拦截器
service.interceptors.request.use(
  config => {
    let reqConfig: any = config
    if (reqConfig.oneAjax) {
      // 每次需要重新生成，防止首次请求被cancel
      config.cancelToken = new CancelToken(c => {
        cancel = c
      })
      if (!window.oneAjax) window.oneAjax = {}
      if (window.oneAjax[reqConfig.url]) {
        // 已经有一个再执行，下一个直接cancel
        cancel()
      }
      window.oneAjax[reqConfig.url] = true
    }
    // 修正method，默认为post
    if (reqConfig.requestMethod) {
      reqConfig.requestMethod = reqConfig.requestMethod.toLocaleLowerCase()
    }
    reqConfig.method = reqConfig.requestMethod || 'post'
    // 添加统一信息
    reqConfig.data = reqConfig.data || {}
    if (reqConfig.method === 'get') {
      reqConfig.params = reqConfig.data
      reqConfig.data = {}
    }
    return reqConfig
  },
  error => {
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    let res: any = response.data
    let resConfig: any = response.config
    // 是否在ajaxing中的判断，同请求只允许存在一个
    if (resConfig.oneAjax) {
      if (!window.oneAjax) window.oneAjax = {}
      window.oneAjax[resConfig.url] = false
    }
    // debug 打印结果
    if (resConfig.console) {
      console.log('url:', resConfig.url)
      console.log('res:', res.value)
    }
    // success表示业务成功，直接resolve
    if (res.success) {
      return Promise.resolve(res)
    }
    return Promise.reject(res)
  },
  error => {
    let errorConfig: any = error.config
    // 已经被cancel的请求会到error中
    if (axios.isCancel(error)) {
      return Promise.reject({
        success: false,
        codeNum: -1,
        codeDesc: '请求中',
        value: {}
      })
    } else if (errorConfig.oneAjax) {
      // 初始化window.oneAjax对象
      if (!window.oneAjax) window.oneAjax = {}
      window.oneAjax[errorConfig.url] = false
    }
    // debug 打印结果
    if (errorConfig.console) {
      console.log('url:', errorConfig.url)
      console.log('res:', error.value)
    }
    return Promise.reject({ codeDesc: '系统异常' })
  }
)

export default service
