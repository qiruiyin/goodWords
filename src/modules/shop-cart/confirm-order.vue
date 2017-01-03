<!--
	确定下单 
 -->
<template>
	<div class="confirm-order">
		<imgText :img-text-data="courseData"></imgText>
		<cellLink class="cell-link-bottom" :cell-link-data="orderDatas.coupon"></cellLink>

		<div class="msg">
			<label>留言</label>
			<input type="text" placeholder="请输入留言">
		</div>

		<cellLink class="cell-link-bottom" :cell-link-data="orderDatas.user"></cellLink>
		<cellLink class="cell-link-bottom" :cell-link-data="orderDatas.payment"></cellLink>
		
		<div class="leave-word">
			<label for=""></label>
		</div>

		<div class="btns">
			<label>合计：<span>￥1770.00</span></label>
			<div class="next" @click="next">下一步</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import imgText from 'components/common/img-text/img-text.vue'
	import cellLink from 'components/common/cell-link/cell-link.vue'

	import img1 from 'assets/img/shop-cart.jpg'

	export default {
		components: {
			imgText, cellLink
		},
		data () {
			return {
				courseData: {
					imgPath: img1,
					title: '汉字思维大礼包',
					version: '18分钟版',
					price: '￥2000.00',
					num: 5
				},
				orderDatas: {
					coupon: {
						label: '优惠券',
						name: '满2000减去300',
						value: '',
					},
					user: {
						label: '叶良辰',
						name: '13845675678',
						value: '',
						desc: '上海市虹口区广纪路838号B座4楼',
						nameColor: 'gray'
					},
					payment: {
						label: '支付方式',
						name: '微信支付',
						nameIcon: 'weixin',
						value: '',
						icon: 'weixin'
					},
					leaveMsg: '' //留言
				}
			}
		},
		methods: {
			next () {
				// this.$router.push({name: ''})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	$msgPadding: px2em(30);

	.msg {
		padding: $msgPadding $paddingRight $msgPadding $paddingLeft;
		background-color: $colorBgWhite;
		display: flex;
    border-top: 1px solid $colorLine;
    border-bottom: 1px solid $colorLine;
    margin-bottom: $marginBottom;

		label {
			width: px2em(100);
		}

		input {
			flex: 1;
			border: 0;
		}
	}

	.btns {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: px2em(110);
		line-height: px2em(110);
		background-color: $colorBgWhite;
		@include font-dpr($font);
		color: $colorArticle;
		border-top: 2px solid $colorLine;
		display: flex;
		text-align: center;

		label {
			flex: 1;
			color: $colorTitleBlack;
			text-align: left;
			text-indent: $paddingLeft;

			span {
				color: $colorTitleRed;
			}
		}

		.next {
			width: px2em(300);
			color: $colorWhite;
			background-color: $colorTitleRed;
		}
	}
</style>