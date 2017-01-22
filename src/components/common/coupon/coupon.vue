<!-- 
	优惠券
 -->

<template>
	<div class="coupon-container">
		<tip  :card-data="couponData"  msg="您暂时没有可用优惠券"></tip>
		<div class="coupon" v-for="(item, index) in couponData" :style="{height: couponHeight + 'px'}"  @click="onClick(item)">
			<div class="coupon-left" v-if="item.couponType == '01'">
				<div class="discount">
					<div class="discount-left">
						<p>￥<span :class="'active'+item.couponReduce.length">{{ item.couponReduce }}</span></p>
						<div class="discount-msg" >{{item.couponSummary}}</div>
					</div>

					<div class="discount-right">
						<p>购物满{{item.couponFulfil}}元可用</p>
						<p>优惠券号：{{ item.couponNo}}</p>
						<p>有效期至：{{ item.couponEndDate}}</p>
					</div>
				</div>
				<div class="coupon-tips">{{ item.couponMemo }}</div>
			</div>
			<div class="coupon-left" v-if="item.couponType != '01'">
				<div class="discount">
					<div class="discount-left">
						<p>￥<span :class="'active'+item.couponInstead.length">{{ item.couponInstead }}</span></p>
						<div class="discount-msg" >{{item.couponSummary}}</div>
					</div>

					<div class="discount-right">
						<p>最低消费{{item.couponLow}}元可用</p>
						<p>优惠券号：{{ item.couponNo}}</p>
						<p>有效期至：{{ item.couponEndDate}}</p>
					</div>
				</div>
				<div class="coupon-tips">{{ item.couponMemo }}</div>
			</div>
			<div class="coupon-right"></div>
		</div>
	</div>
</template>

<script type="text/babel">
	import tip from 'components/common/card/tip.vue'
	
	export default {
		props: ['couponData'],
		components: {
			 tip
		},
		data () {
			return {
				
			}
		},
		computed: {
			couponHeight () {
				return document.body.clientWidth * 0.4
			}
		},
		methods: {
			onClick (val) {
				console.log(2)
				this.$emit('on-click', val)
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
		padding-right: px2em(80);
		margin-top: px2em(10);
		@include font-dpr($fontLabel);
		color: $colorTips;
	}

	// [data-dpr="3"] .coupon-tips {
	// 	// padding-right: px2em(100);
	// }

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