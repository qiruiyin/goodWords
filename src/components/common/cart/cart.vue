<!-- 
	漂浮的购物车
-->

<template>
	<div class="cart icon-cart_big" @click="goShopCart">
		<div v-if="cartNum < 100" :class="['cart-num', { 'hide-num': cartNum <= 0 }]">{{ cartNum }}</div>
		<div v-else>
			<div class="cart-num ellipsis">99+</div>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		data () {
			return {
				cartNum : 0,
				cartNumUrl: 'shopcart/getShopcartNum'
			}
			
		},
		methods: {
			setCartNum (num) {
				this.cartNum = num
			},
			getCartNum () {
				return this.cartNum
			},
			goShopCart () {
				this.$router.push({name: 'shopCart'});
			},
			fetchData(){	
				var vm = this;
				this.$http.get(this.cartNumUrl).then(function(response){
				   vm.cartNum = response.data.t;
				})
			},
			addCartNum(num){
				this.cartNum = this.cartNum*1 + num*1;
				if(this.cartNum < 0){
					this.cartNum = 0;
				}
			}
		},
		created (){
			var vm = this;
			vm.fetchData();
			/**
			bus.$on('addCartNum', function (num) {
			   vm.cartNum += num;
			})**/
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	$cartColorBg: $colorTitleRed;

	.cart {
		position: fixed;
		bottom: px2em(50);
		right: px2em(50);
	}

	.cart-num {
		position: absolute;
		top: 0;
		right: 0;
		width: px2em(50);
		height: px2em(50);
		border-radius: px2em(25);
		line-height: px2em(50);
		text-align: center;
		color: #fff;
		background-color: $cartColorBg;

		&.hide-num {
			display: none;
		}
	}
</style>