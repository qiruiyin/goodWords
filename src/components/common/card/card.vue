<!-- 
	购买的卡片
 -->

<template>
	<div class="card">
		<div class="card-header">
			<router-link :to="{ name: cardData.url, params: cardData.params }">
				<img class="img" :src="cardData.imgPath" alt="card">
			</router-link>
		</div>
		<div class="card-body">
			<h3>{{ cardData.title }}</h3>
			<div v-if="cardData.price" class="price">{{ cardData.price }}<span> x {{ cardData.num }}集</span></div>
			<ul class="actions">
				<li :class="[item.value, {'active' : item.num > 0}]" v-for="(item, index) in filterActions" @click="setActionNums(index)">
					{{ item.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		props: ['cardData'],
		data () {
			return {
				cardTitle: "",
				actions: [
					{
						name: "点赞",
						value: 'zan',
						choosed: false,
						num: 0
					},{
						name: '收藏',
						value: 'store',
						choosed: false,
						num: 0
					},{
						name: '购物车',
						value: 'cart',
						choosed: false,
						num: 0
					}
				]
			}
		},
		computed: {
			filterActions () {
				let actions = this.cardData.actions || []
				return this.actions.filter(function(elem, index) {
					return actions.indexOf(elem.value) != -1
				})
			}
		},
		methods: {
			setActionNums(ind) {
				this.actions[ind].num += this.actions[ind].choosed ? -1 : 1
				this.actions[ind].choosed = !this.actions[ind].choosed
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	.card {
		margin-bottom: $marginBottom;
		@include font-dpr($fontLabel);
		background: $colorBgWhite;
	}

	.card-body {
		position: relative;
		padding: px2em(25) $paddingRight px2em(25) $paddingLeft
	}

	h3 {
		@include font-dpr($font);
		color: $colorTitleBlack;
		font-weight: normal;
	}

	.price {
		padding-top: px2em(20);
		color: $colorTitleRed;
		@include font-dpr($font);

		span {
			@include font-dpr($fontLabel);
			color: $colorSubText;
		}
	}

	.actions {
		position: absolute;
		top: px2em(20);
		right: $paddingRight;
		@include font-dpr($fontLabel);

		li {
			position: relative;
			float: left;
			width: px2em(100);
			padding-top: px2em(50);
			display: block;
			text-align: center;
			color: $colorTips;

			&:before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				margin: 0 auto;
				@include img-dpr(".icon-zan");

				&.store {
					@include img-dpr(".icon-store");
				}
				&.cart {
					@include img-dpr(".icon-cart");
				}
			}

			&.active {
				&:before {
					@include img-dpr(".icon-zan_active")

					&.store {
						@include img-dpr(".icon-store_active");
					}
					&.cart {
						@include img-dpr(".icon-cart_active");
					}		
				}
			}
		}
	}
</style>