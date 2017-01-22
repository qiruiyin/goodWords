<!-- 
	订单卡片
 -->
<!-- 
	删除时会触发删除事件，建议给个唯一标识，可以返回
 -->
<template>
	<div :class="['card-order', {hide: hide}]">
		<div class="card-order-header">
			<label>订单号：{{ cardOrderData.orderNo }}</label>
			<div class="icon icon-trash" v-if="cardOrderData.deleteBtn" @click="deleteCard"></div>			
		</div>

		<div class="card-order-body">
			<imgText :img-text-data="item"  v-for="item in cardOrderData.detailList"></imgText>
			<div class="order-sums">
				<div class="date">{{ cardOrderData.orderTime }}</div>
				<div class="sums">
					共{{ cardOrderData.goodsCount }}件商品，实付款<span>{{ cardOrderData.orderMoney }}</span>
				</div>
			</div>
		</div>

		<div class="card-order-footer">
			<slot name="footer"></slot>
		</div>
	</div>	
</template>

<script type="text/babel">
	import imgText from 'components/common/img-text/img-text'

	export default {
		components: {
			imgText
		},
		props: ['cardOrderData'],
		data () {
			return {
				hide: false
				// cardOrderData: {
				// 	title: '',
				// 	deleteBtn: true
				// 	orderData: {
				// 		imgPath: img1,
				// 		title: '汉字思维大礼包(20个故事)',
				// 		date: '2016-03-01',
				// 		value: '￥30.00',
				// 		num: 1
				// 	}
				// },
			}
		},
		methods: {
			deleteCard () {
				this.hide = true
				this.$emit("on-delete")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	.card-order {
		margin-bottom: $marginBottom;
		@include font-dpr($font);
		border-bottom: 1px solid $colorLine;

		&.hide {
			display: none;
		}
	}

	.card-order-header {
		padding: 0 $paddingRight 0 $paddingLeft;
		line-height: px2em(80);
		background-color: $colorBgWhite;
		border-bottom: 1px solid $colorLine;
	
		label {
			border-left: px2em(4) solid #ec5a35;
			padding-left: px2em(15);
		}

		.btn {
			float: right;
		}

		.icon {
			float: right;
			margin-top: px2em(20);
		}
	}

	.order-sums {
		@extend %clearfix;
		padding: 0 $paddingRight 0 $paddingLeft;
		line-height: px2em(90);
		border-bottom: 1px solid $colorLine;
		background-color: $colorBgWhite; 
		
		.date {
			float: left;
			color: $colorTime;
		}

		.sums {
			float: right;

			span {
				margin-left: px2em(15);
				color: $colorTitleRed;
			}
		}
	}

	.card-order-footer {
		height: px2em(100);
		padding: px2em(20) $paddingRight px2em(20) $paddingLeft;
		line-height: px2em(100 - 40);
		background-color: $colorBgWhite;
		text-align: right;
		
		.status {

		}
	}
</style>