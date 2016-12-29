<!-- 
	订单卡片
 -->

<template>
	<div class="card-order">
		<div class="card-order-header">
			<label>订单号：{{ cardOrderData.title }}</label>
			<slot name="header-btn"></slot>					
		</div>

		<div class="card-order-body">
			<imgText :img-text-data="orderData"></imgText>
			<div class="order-sums">
				<div class="date">{{ date }}</div>
				<div class="sums">
					共{{ sums.num }}件商品，实付款<span>{{ sums.value }}</span>
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
	import img1 from 'assets/img/shop-cart.jpg'

	export default {
		components: {
			imgText
		},
		data () {
			return {
				cardOrderData: {
					title: '',
				},
				orderData: {
					imgPath: img1,
					title: '汉字思维大礼包(20个故事)'
				},
				date: '2016-03-01',
				sums: {
					value: '￥30.00',
					num: 1
				}
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
	}

	.order-sums {
		@extend %clearfix;
		padding: 0 $paddingRight 0 $paddingLeft;
		line-height: px2em(90);
		border-bottom: 1px solid $colorLine;
		background-color: $colorBgWhite; 
		
		.date {
			float: left;
		}

		.sums {
			float: right;

			span {
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