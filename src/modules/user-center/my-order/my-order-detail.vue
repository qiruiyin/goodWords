<!-- 
	我的订单详情
 -->
<template>
	<div class="my-order-detail">
		<div class="order-heaader">
			<label>订单号：{{ orderData.number }}</label>
			<div class="status">{{ orderData.status }}</div>
		</div>

		<div class="order-body">
			<cell-link class="margin-bottom" :cell-link-data="orderData.userInfo"></cell-link>

			<imgText :img-text-data="item" v-for="item in orderData.gifts"></imgText>
			
			<cell-link class="pay margin-bottom" :cell-link-data="orderData.payment"></cell-link>

			<cell-link :cell-link-data="orderData.sums"></cell-link>
			<cell-link :cell-link-data="orderData.discount"></cell-link>
			<cell-link :cell-link-data="orderData.time"></cell-link>
			<cell-link :cell-link-data="orderData.paid"></cell-link>
			
			<div class="footer-btn">
				
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import cellLink from 'components/common/cell-link/cell-link.vue'
	import imgText from 'components/common/img-text/img-text.vue'

	import img1 from 'assets/img/shop-cart.jpg'

	export default {
		components: {
			cellLink, imgText
		},
		data () {
			return {
				orderData: {
					number: '123214124',
					status: '已支付',
					userInfo: {
						label: '叶良辰', // 左侧名字 
						name: '13845675678', // 右侧信息
						value: '',	// 值
						desc: '上海市虹口区广纪路838号B座4楼', //详情介绍
					},
					gifts: [
						{
							imgPath: img1,
							title: '汉字思维大礼包',
							price: '￥2000.00'
						},{
							imgPath: img1,
							title: '汉字思维大礼包',
							price: '￥2000.00'
						},{
							imgPath: img1,
							title: '汉字思维大礼包',
							price: '￥2000.00'
						}
					],
					payment: {
						label: '支付方式',
						name: '微信支付',
					},
					sums: {
						label: '商品总额',
						name: '￥360.00'
					},
					discount: {
						label: '折扣优惠券',
						name: '满100减30'
					},
					time: {
						label: '下单时间',
						name: '2016-12-12'
					},
					paid: {
						label: '实付款',
						name: '￥360.00'
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	.my-order-detail {

	}

	.order-heaader {
		padding: 0 $paddingRight 0 $paddingLeft;
		line-height: px2em(80);
		background-color: $colorBgWhite;
		border-bottom: 1px solid $colorLine;

		label {
			border-left: px2em(4) solid #ec5a35;
			padding-left: px2em(15);
		}

		.status {
			float: right;
		}
	}

	.order-body {
		padding-top: $marginBottom;
	}

	.pay {
		margin-top: $marginBottom;
	}
</style>