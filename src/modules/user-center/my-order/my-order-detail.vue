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
			<cell-link :cell-link-data="orderData.time" v-if="orderData.status == '已支付'"></cell-link>
			<cell-link :cell-link-data="orderData.paid" v-if="orderData.status == '已支付'"></cell-link>
			
			<div class="footer-btn" v-if="orderData.status != '已支付'">
				<div class="delete"><div class="icon-trash"></div>删除</div>
				<div class="submit">支付</div>
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
						url: 'address',
						label: '叶良辰', // 左侧名字 
						name: '13845675678', // 右侧信息
						nameColor: 'gray',
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
						nameIcon: 'weixin',
					},
					sums: {
						label: '商品总额',
						name: '￥360.00',
						nameColor: 'red',
						noArrow: true
					},
					discount: {
						label: '折扣优惠券',
						name: '满100减30',
						nameColor: 'red',
						noArrow: true
					},
					time: {
						label: '下单时间',
						name: '2016-12-12',
						noArrow: true,
					},
					paid: {
						label: '实付款',
						name: '￥360.00',
						noArrow: true
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

	.footer-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: px2em(110);
		line-height: px2em(110);
		background-color: $colorBgWhite;
		text-align: center;
		display: flex;

		.delete {
			position: relative;
			width: px2em(220);
			color: $colorSubText;
		}

		.submit {
			flex: 1;
			color: $colorWhite;
			background-color: $colorTitleRed;
		}
	}

	.icon-trash {
		position: absolute;
		top: 50%;
		left: px2em(40);
		margin-top: - px2em(17); //取自图片大小
	}

</style>