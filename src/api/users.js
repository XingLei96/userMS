/**
 * api接口统一管理
 */
// import request from '@/utils/request'
import {get, post, postQs, postjson, getNoloading} from './request'
import baseUrl from './baseURL'

// 分页获取用户列表
export function getUsers(data) {
  return get(baseUrl.Api+'/api/users', data)
  // return request({
  //   url: baseUrl.Api+'/api/users',
  //   method: 'get',
  //   data
  // })
}


