import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// Vue.config.silent = true

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

import VueI18n from "vue-i18n";
Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: "en",//语言标识
	messages: {//配置多语言 根据自己的项目需求  这里配置了中文和英文
		'zh': require('@/lang/zh.js'),//中文
		'en': require('@/lang/en.js'),//英文
	},
	fallbackLocale: "zh",//没有英文的时候默认 中文语言
	silentTranslationWarn: true,//报错时加上这个参数可以取消警告
	//this.$i18n.locale // 通过切换locale的值来实现语言切换
});


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
	i18n,
  render: h => h(App)
})
