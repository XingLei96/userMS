/**
 * api接口统一管理
 */
// import request from '@/utils/request'
import { get, post, postQs, postjson, getNoloading } from './request'
import baseUrl from './baseURL'
import request from '@/utils/request'

// 分页获取用户列表
export function userList(data) {
	return request({
		url: '/users/',
		method: 'get',
		data
	})
}


