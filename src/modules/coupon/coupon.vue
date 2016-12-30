<!-- 
	优惠券
 -->

<template>
	<div class="coupon-container">
		<div class="coupon" v-for="(item, index) in couponData">
			<div class="coupon-left">
				<div class="discount">
					<div class="discount-left">
						<p>{{ item.unit }}<span :class="'active'+item.discount.length">{{ item.discount }}</span></p>
						<div class="discount-msg">{{ item.discountMsg }}</div>
					</div>

					<div class="discount-right">
						<p>{{ item.msg }}</p>
						<p>优惠券号：{{ item.discountNum }}</p>
						<p>有效期至：{{ item.time }}</p>
					</div>
				</div>
				<div class="coupon-tips">{{ item.tips }}</div>
			</div>
			<div class="coupon-right">优惠券</div>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		data () {
			return {
				couponData: [
					{
						discount: '20',
						unit: '￥',
						msg: '购物满100元可用',
						discountMsg: '满100减20',
						discountNum: '383174713294',
						time: '2016-12-21',
						tips: '可抵扣好字在微信商城所有商品，不能与其他优惠券同时使用'
					},{
						discount: '20',
						unit: '￥',
						msg: '购物满100元可用',
						discountMsg: '满100减20',
						discountNum: '383174713294',
						time: '2016-12-21',
						tips: '可抵扣好字在微信商城所有商品，不能与其他优惠券同时使用'
					},{
						discount: '20',
						unit: '￥',
						msg: '购物满100元可用',
						discountMsg: '满100减20',
						discountNum: '383174713294',
						time: '2016-12-21',
						tips: '可抵扣好字在微信商城所有商品，不能与其他优惠券同时使用'
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	.coupon-container {
		padding-top: $marginBottom;
	}

	.coupon {
		display: flex;
		width: 100%;
		padding: px2em(50) px2em(50) px2em(50) px2em(70);
		line-height: 1.5;
		@include font-dpr($fontLabel);
		background: url("~assets/img/spriter/discount_coupon3x.png") no-repeat;
		background-size: 100%;
		margin-bottom: $marginBottom;
	}

	[data-dpr="3"] .coupon {
		font-size: 40px;
	}

	.discount {
		color: $colorTitleRed;
		@extend %clearfix;
	}

	.discount-left {
		float: left;
		padding-right: px2em(10);
	}

	.discount-msg {
		color: $colorTitleBlack;
	}


	.discount-right {
		float: left;
		width: px2em(360);
		padding-left: px2em(10);
		border-left: px2em(2) solid $colorTitleRed;
	}

	.coupon-tips {
		padding-right: px2em(30);
		margin-top: px2em(10);
		@include font-dpr($fontLabel);
		color: $colorTips;
	}

	[data-dpr="3"] .coupon-tips {
		padding-right: px2em(40);
	}

	[data-dpr="2"] .coupon-tips {
		font-size: 20px;
	}

	.coupon-right {
		flex: 1;
		padding: px2em(20) px2em(40);
		@include font-dpr(16px);
		color: $colorWhite;
	}

	[data-dpr="2"] .coupon-right {
		padding-top: 8px;
	}
	
	.discount-left {
		span {
			@include font-dpr(28px);
			line-height: 1.25;

			&.active3 {
				@include font-dpr(24px);
			}
			&.active4 {
				@include font-dpr(20px);
			}
		}
	}
</style>