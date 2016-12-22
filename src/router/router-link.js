import loadView from './async-view-loader'

const routes = [
		{
			path: '/',
			name: 'demo',
			component: loadView(loaded => {
        require(['../modules/demo.vue'], loaded)
      }),
			meta: {
				title: '首页'	
			}
		},{
			path: '/course',
			name: 'course',
			component:  loadView(loaded => {
        require(['../modules/course/course.vue'], loaded)
      }),
			meta: {
				title: '汉字思维课'
			}
		}
	]

export default routes