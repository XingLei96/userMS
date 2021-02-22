/**
 * 封装axios的get和post方法
 */
import axios from 'axios'
import QS from 'qs'
import {Message,Loading } from 'element-ui'
import store from '@/store'
import local from '../utils/local'
import Router from '../router/index'

// loading进度条设置
let globalLoading
function startLoading () {
  globalLoading = Loading.service({
    lock: true,
    text: '',
    spinner:'el-icon-loading',
    customClass:'load_icon',
    background: 'rgba(255, 255, 255, 0.6)'
  })
}

function endLoading () {
  setTimeout(() => {
    globalLoading.close()
  }, 500)
}

/**
 * 请求超时
 */
// axios.defaults.timeout = 5000;
axios.defaults.withCredentials=true;
/**
 * POST请求头设置
 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//request interceptors
// axios.interceptors.request.use(
//   config => {
//     // Do something before request is sent
//       if (local.get('userID')!=='') {

//     // 让每个请求携带token--['X-token']为自定义key 可根据实际情况修改
//           config.headers['userid'] = local.get('userID')
//       }else {
//         //   未登录
//         // Router.push({
//         //   name: 'login',
//         //   query: { Rurl: Router.currentRoute.name }
//         // })
//       }
//     return config
//   },
//   error => {
//     //Do something with request error
//     Promise.reject(error);
//   }
// )
// //response interceptors
// axios.interceptors.response.use(
//   response => {
//     // 对响应数据做点什么
//     if (response.data.code === 417) {
//       // console.log(Router);
//     //   Router.push({
//     //     name: 'login',
//     //     query: { Rurl: Router.currentRoute.name }
//     //   })
//       // setTimeout(() => {
//       //   localStorage.removeItem('token')
//       //   Router.push({
//       //     name: 'Login'
//       //   })
//       // }, 2000)
//     }
//     return response
//   },
//   error => {
//     Message({
//       // message: error.message,
//       message: "请检查网络",
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

/**
 * get方法，对应get请求
 * @Param {String} url [请求的URL地址]
 * @Param {Object} params [请求时携带的参数]
 */

export function get(url, params) {
  startLoading ();
  let userInfo = local.get('userInfo');
  // userInfo = userInfo || JSON.parse(userInfo);
  axios.defaults.headers['Connection-login'] = `${userInfo.loginId}`;
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(res => {
      endLoading ()
      resolve(res.data);
      // console.log(res.data.code)
      if (res.data.code==2001) {
        Message({
          message: res.data.msg,
          type: 'error',
          duration: 2 * 1000
        })
        Router.push({
          name: 'Login'
        })
      }
    })
    .catch(err => {
      endLoading ()
      reject(err.data);
    })
  });
}

export function getNoloading(url, params) {
  startLoading ();
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(res => {
      endLoading ();
      resolve(res.data);
      console.log(res.data)
    })
    .catch(err => {
      endLoading ();
      reject(err.data);
    })
  });
}
/**
 * post方法，对应post请求
 * @Param [String] url [请求的url地址]
 * @Param [Object] params [请求时携带的参数]
 */
export function post(url, params,type) {
  console.log(type)
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  let userInfo = local.get('userInfo');
  userInfo = userInfo || JSON.parse(userInfo);
  axios.defaults.headers.post['Connection-login'] = `${userInfo.loginId}`;
  if (type) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }
//   store.commit('SET_Loading', true)
        startLoading ()
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        // store.commit('SET_Loading', false)
        endLoading ()
        resolve(res.data);
        console.log(res.data)
      })
      .catch(err => {
        // store.commit('SET_Loading', false)
        endLoading ()
        reject(err.data)
      })
  });
}

export function postNoloading(url, params,type) {
  console.log(type)
  if (type) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    let userInfo = local.get('userInfo');
    userInfo = userInfo || JSON.parse(userInfo);
    axios.defaults.headers.post['Connection-login'] = `${userInfo.loginId}`;
  }
//   store.commit('SET_Loading', true)
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        // store.commit('SET_Loading', false)
        resolve(res.data);
        console.log(res.data)
      })
      .catch(err => {
        // store.commit('SET_Loading', false)
        reject(err.data)
      })
  });
}
/**
 * post方法，对应post请求上传表格
 * @Param [String] url [请求的url地址]
 * @Param [Object] params [请求时携带的参数]
 */
export function postQs(url, params) {
  // startLoading ()
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        // endLoading ()
        resolve(res.data);
        console.log(res.data)
      })
      .catch(err => {
        // endLoading ()
        reject(err.data)
      })
  });
}

export function postjson(url, params) {
  axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
  let userInfo = local.get('userInfo');
  userInfo = userInfo || JSON.parse(userInfo);
  axios.defaults.headers.post['Connection-login'] = `${userInfo.loginId}`;
//   store.commit('SET_Loading', true)
  startLoading ()
  return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify(params))
      .then(res => {
        // store.commit('SET_Loading', false)
        endLoading ()
        resolve(res.data);
        console.log(res.data)
        if (res.data.code==2001) {
          Message({
            message: res.data.msg,
            type: 'error',
            duration: 2 * 1000
          })
          Router.push({
            name: 'Login'
          })
        }
      })
      .catch(err => {
        // store.commit('SET_Loading', false)
        endLoading ()
        reject(err.data)
      })
  });
}

/**
 * post方法，对应post请求
 * @Param [String] url [请求的url地址]
 * @Param [Object] params [请求时携带的参数]
 */
export function axiosPost(url, params) {
  let userInfo = local.get('userInfo');
  userInfo = userInfo || JSON.parse(userInfo);
  axios.defaults.headers.post['Connection-login'] = `${userInfo.loginId}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  startLoading ();
  return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify(params))
      .then(res => {
        endLoading ();
        resolve(res.data);
        console.log(res.data)
      })
      .catch(err => {
        endLoading ();
        reject(err.data);
      })
  });
}

export function uploadMultipleFile(url, fileList) {
  let userInfo = local.get('userInfo');
  userInfo = userInfo || JSON.parse(userInfo);
  axios.defaults.headers.post['Connection-login'] = `${userInfo.loginId}`;
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  startLoading ();
  return new Promise((resolve, reject) => {
    axios.post(url, fileList)
      .then(res => {
        endLoading ();
        resolve(res.data);
        console.log(res.data)
      })
      .catch(err => {
        endLoading ();
        reject(err.data);
      })
  });
}
