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
			path: '/my-story',
			name: 'myStory',
			component:  loadView(loaded => {
        require(['../modules/user-center/my-story/my-story.vue'], loaded)
      }),
			meta: {
				title: '我的故事'
			}
		},{
			path: '/my-course/:storyId',
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
		},{
			path: '/my-order',
			name: 'myOrder',
			component:  loadView(loaded => {
        require(['../modules/user-center/my-order/my-order.vue'], loaded)
      }),
			meta: {
				title: '我的订单'
			}
		},{
			path: '/my-order-detail/:orderId',
			name: 'myOrderDetail',
			component:  loadView(loaded => {
        require(['../modules/user-center/my-order/my-order-detail.vue'], loaded)
      }),
			meta: {
				title: '我的订单'
			}
		},{
			path: '/coupon',
			name: 'coupon',
			component:  loadView(loaded => {
        require(['../modules/coupon/coupon.vue'], loaded)
      }),
			meta: {
				title: '优惠券'
			}
		},{
			path: '/address',
			name: 'address',
			component:  loadView(loaded => {
        require(['../modules/address/address.vue'], loaded)
      }),
			meta: {
				title: '地址管理'
			}
		},{
			path: '/address-add',
			name: 'addressAdd',
			component:  loadView(loaded => {
        require(['../modules/address/address-add.vue'], loaded)
      }),
			meta: {
				title: '新增收货地址'
			}
		},{
			path: '/address-edit',
			name: 'addressEdit',
			component:  loadView(loaded => {
        require(['../modules/address/address-edit.vue'], loaded)
      }),
			meta: {
				title: '编辑收货地址'
			}
		},{
			path: '/my-store',
			name: 'myStore',
			component:  loadView(loaded => {
        require(['../modules/user-center/my-store/my-store.vue'], loaded)
      }),
			meta: {
				title: '我的收藏'
			}
		},{
			path: '/my-consult',
			name: 'myConsult',
			component:  loadView(loaded => {
        require(['../modules/user-center/my-consult/my-consult.vue'], loaded)
      }),
			meta: {
				title: '我的咨询'
			}
		},{
			path: '/my-consult-add',
			name: 'myConsultAdd',
			component:  loadView(loaded => {
        require(['../modules/user-center/my-consult/my-consult-add.vue'], loaded)
      }),
			meta: {
				title: '我要咨询'
			}
		}
	]

export default routes