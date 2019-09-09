import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

/* 引入axios */
import axios from 'axios';
Vue.prototype.$axios = axios;

/* 使用mint-ui */
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
/* 引入动画 */
import { Indicator } from 'mint-ui';
Vue.use(MintUI)

//请求拦截(在使用网络请求数据时自动加载动画)
axios.interceptors.request.use(config => {
		//加载动画
		Indicator.open();
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
//响应拦截
axios.interceptors.response.use(response => {
		Indicator.close();
		return response;
	},
	error => {
		//错误提醒
		Indicator.close();
		return Promise.reject(error);
	})

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
