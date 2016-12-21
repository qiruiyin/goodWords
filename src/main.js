import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Course from './modules/course/course'
import Demo from './modules/demo'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [
		{
			path: '/',
			component: Demo,
			meta: {
				title: '首页'	
			}
		},{
			path: '/course',
			name: 'course',
			component: Course,
			meta: {
				title: '课程'
			}
		}
	]
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from, next) => {
  // 设置标题
  global.document.title = to.meta.title || '好字'
  // 滚动条回到头部
  global.scrollTo(0, 0)
})

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
