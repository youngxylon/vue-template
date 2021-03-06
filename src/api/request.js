import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { baseURL } from '@/settings'

// create an axios instance
const service = axios.create({
  baseURL: baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers['X-Auth-Token'] = store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (res.code === 0) {
      return res
    } else {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  error => {
    console.log(error.response) // for debug

    //user token error
    if (error.response && error.response.status === 403) {
      Message({
        message: '登录过期，请重新登录！',
        type: 'warning',
        duration: 5 * 1000
      })
      store.dispatch('user/logout')
    } else {
      Message({
        message: '系统繁忙，请稍后重试！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
