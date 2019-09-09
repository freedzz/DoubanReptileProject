import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Module1 from './views/module/Module1.vue'
import Module2 from './views/module/Module2.vue'
import Module3 from './views/module/Module3.vue'
import Module4 from './views/module/Module4.vue'
import Module5 from './views/module/Module5.vue'
import Module6 from './views/module/Module6.vue'
import Module7 from './views/module/Module7.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	linkActiveClass:'active',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/module1',
			name: 'module1',
			component: Module1
		},
		{
			path: '/module2',
			name: 'module2',
			component: Module2
		},
		{
			path: '/module3',
			name: 'module3',
			component: Module3
		},
		{
			path: '/module4',
			name: 'module4',
			component: Module4
		},
		{
			path: '/module5',
			name: 'module5',
			component: Module5
		},
		{
			path: '/module6',
			name: 'module6',
			component: Module6
		},
		{
			path: '/module7',
			name: 'module7',
			component: Module7
		}

	]
})
