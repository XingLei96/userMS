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
		url: 'api/users/',
		method: 'get',
		data
	})
}

// 获取当前用户基本信息 编辑
export function getUser(data) {
	return request({
		url: 'api/users/' + data,
		method: 'get',
	})
}

// 删除用户
export function deleteUser(data) {
	return request({
		url: 'api/users/' + data,
		method: 'get',
	})
}



