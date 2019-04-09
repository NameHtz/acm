import axios from "axios";
import qs from "qs";
import {getToken} from './auth.js'
import router from 'next/router'
// react 中使用antd  此处自定义
import {message, notification} from "antd";
import {baseURL} from "./config";
// 创建axios默认请求
axios.defaults.baseURL = baseURL;
// 配置超时时间
axios.defaults.timeout = 10000;
// 配置请求拦截
axios.interceptors.request.use(config => {
  if (sessionStorage.getItem('token')) {
    config.headers['Authorization'] = sessionStorage.getItem('token');
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    notification.error(
      {
        placement: 'bottomRight',
        bottom: 50,
        duration: 2,
        message: '出错了',
        description: '服务器大叔任性了，请稍后再试'
      }
    )
    return Promise.reject(error);
  }
);
/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数
 */
var get = function (url, params, isSuccess = false,description) {
  return new Promise((resolve, reject) => {
    const hide = message.loading('loading....', 0);
    axios.get(url, params).then(res => {
      setTimeout(hide, 0);
      if (res.data.status == 200) {
        if (isSuccess) {
          notification.success(
            {
              placement: 'bottomRight',
              bottom: 50,
              duration: 2,
              message: '操作提醒',
              description: description?description:'操作成功！'
            }
          )
        }
        resolve(res);
      } else if (res.data.status == 40301) {
        notification.error(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 1,
            message: '登陆过期',
            description: '登陆失效，请重新登陆！'
          }
        )
        router.push('/login')
      } else {
        notification.error(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 2,
            message: '出错了',
            description: res.data.message
          }
        )
      }
    })
      .catch(err => {
        reject(err);
      });
  });
};
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数
 */

var post = function (url, data, isSuccess = false,description) {
  return new Promise((resolve, reject) => {
    const hide = message.loading('loading....', 0);
    axios.post(url, data).then(res => {
      console.log(res,'axios')
      setTimeout(hide, 0);
      if (res.data.status == 200) {
        if (isSuccess) {
          notification.success(
            {
              placement: 'bottomRight',
              bottom: 50,
              duration: 2,
              message: '操作提醒',
              description: description?description:'操作成功！'
            }
          )
        }
        resolve(res);
      } else if (res.data.status == 40301) {
        notification.error(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 1,
            message: '出错了',
            description: '登陆失效，请重新登陆！'
          }
        )
        router.push('/login')
      } else {
        notification.error(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 2,
            message: '出错了',
            description: res.data.message
          }
        )
      }
    })
      .catch(err => {
        reject(err);
      });
  });
};
var deleted = function (url, params, isSuccess = false,description) {
  return new Promise((resolve, reject) => {
    const hide = message.loading('loading....', 0);
    axios.delete(url, params).then(res => {
      setTimeout(hide, 0);
      if (res.data.status == 200) {
        if (isSuccess) {
          notification.success(
            {
              placement: 'bottomRight',
              bottom: 50,
              duration: 2,
              message: '操作提醒',
              description: description?description:'操作成功！'
            }
          )
        }
        resolve(res);
      } else if (res.data.status == 40301) {
        notification.error(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 1,
            message: '出错了',
            description: '登陆失效，请重新登陆！'
          }
        )
        router.push('/login')
      } else {
        notification.error(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 2,
            message: '出错了',
            description: res.data.message
          }
        )
      }
    })
      .catch(err => {
        reject(err);
      });
  });
};
var put = function (url, data, isSuccess = false,description) {
  return new Promise((resolve, reject) => {
    const hide = message.loading('loading....', 0);
    axios.put(url, data).then(res => {
      setTimeout(hide, 0);
      if (res.data.status == 200) {
        if (isSuccess) {
          notification.success(
            {
              placement: 'bottomRight',
              bottom: 50,
              duration: 2,
              message: '操作提醒',
              description: description?description:'操作成功！'
            }
          )
        }
        resolve(res);
      } else if (res.data.status == 40301) {
        notification.error(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 1,
            message: '出错了',
            description: '登陆失效，请重新登陆！'
          }
        )
        router.push('/login')
      } else {
        notification.error(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 2,
            message: '出错了',
            description: res.data.message
          }
        )
      }
    })
      .catch(err => {
        reject(err);
      });
  });
};
export default {get, post, deleted, put};
