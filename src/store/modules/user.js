import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
	return {
		token: getToken(),
		name: '',
		avatar: ''
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		console.log(token, '0000')
		state.token = token
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	}
}

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { email, password } = userInfo
		return new Promise((resolve, reject) => {
			login({ email: email.trim(), password: password }).then(response => {
				const { payload } = response
				commit('SET_TOKEN', 'Bearer ' + payload.token)
				setToken('Bearer ' + payload.token)
				commit('SET_NAME', email)

				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// get user info
	// getInfo({ commit, state }) {
	// 	return new Promise((resolve, reject) => {
	// 		getInfo(state.token).then(response => {
	// 			const { data } = response

	// 			if (!data) {
	// 				return reject('Verification failed, please Login again.')
	// 			}

	// 			const { name, avatar } = data

	// 			commit('SET_NAME', name)
	// 			commit('SET_AVATAR', avatar)
	// 			resolve(data)
	// 		}).catch(error => {
	// 			reject(error)
	// 		})
	// 	})
	// },

	// user logout
	logout({ commit, state }) {
		console.log(commit)
		console.log(state)
		return new Promise((resolve, reject) => {
			console.log(state.token)
				removeToken(state.token) // must remove  token  first
				location.reload() 
			// logout(state.token).then(() => {
				// console.log(state.token)
				// resetRouter()
				// this.$router.push({ path: "/"});
				// commit('RESET_STATE')
				// resolve()
			// }).catch(error => {
			// 	reject(error)
			// })
		})
	},

	// remove token
	// resetToken({ commit }) {
	// 	return new Promise(resolve => {
	// 		removeToken() // must remove  token  first
	// 		commit('RESET_STATE')
	// 		resolve()
	// 	})
	// }
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

