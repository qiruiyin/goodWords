import loadView from './async-view-loader'

const routes = [
		{
			path: '/',
			name: 'index',
			component:  loadView(loaded => {
        require(['../modules/course/course.vue'], loaded)
      }),
			meta: {
				title: '汉字思维课'
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
		},{
			path: '/course-simple/:courseId',
			name: 'courseSimple',
			component:  loadView(loaded => {
        require(['../modules/course/course-simple.vue'], loaded)
      }),
			meta: {
				title: '汉字思维单集'
			}
		},{
			path: '/course-spree',
			name: 'courseSpree',
			component:  loadView(loaded => {
        require(['../modules/course/course-spree.vue'], loaded)
      }),
			meta: {
				title: '汉字思维大礼包'
			}
		},{
			path: '/shop-cart',
			name: 'shopCart',
			component:  loadView(loaded => {
        require(['../modules/shop-cart/shop-cart.vue'], loaded)
      }),
			meta: {
				title: '购物车'
			}
		},{
			path: '/confirm-order',
			name: 'confirmOrder',
			component:  loadView(loaded => {
        require(['../modules/shop-cart/confirm-order.vue'], loaded)
      }),
			meta: {
				title: '确认订单'
			}
		},{
			path: '/my-course',
			name: 'myCourse',
			component:  loadView(loaded => {
        require(['../modules/user-center/my-course/my-course.vue'], loaded)
      }),
			meta: {
				title: '我的课程'
			}
		},{
			path: '/my-course-detail/:courseId',
			name: 'myCourseDetail',
			component:  loadView(loaded => {
        require(['../modules/user-center/my-course/my-course-detail.vue'], loaded)
      }),
			meta: {
				title: '课件详情'
			}
		},{
			path: '/user-center',
			name: 'userCenter',
			component:  loadView(loaded => {
        require(['../modules/user-center/user-center/user-center.vue'], loaded)
      }),
			meta: {
				title: '用户中心'
			}
		}
	]

export default routes