<!-- 
	我的订单列表
 -->

<template>
	<div class="my-order">
		<tab @on-selectedIndex-change="onSelectedIndexChange">
			<div v-if="selectedIndex == 0">
				<card-order :card-order-data="cardOrderData" v-for="item in 3" @on-delete="deleteCard">
					<div class="btns" slot="footer">
						<div class="btn btn-cancel">取消</div>
						<router-link class="btn btn-active" :to="{name: 'myOrderDetail', params: {orderId: 1}}">支付</router-link>
					</div>
				</card-order>
			</div>

			<div v-if="selectedIndex == 1">
				<card-order :card-order-data="cardOrderData" v-for="item in 3" @on-delete="deleteCard">
					<div class="btns" slot="footer">
						<div class="status">已支付</div>
					</div>
				</card-order>
			</div>
			
			<div v-if="selectedIndex == 2">
				<card-order :card-order-data="cardOrderData" v-for="item in 3" @on-delete="deleteCard">
					<div class="btns" slot="footer">
						<div class="btn btn-cancel">取消</div>
						<router-link class="btn btn-active" :to="{name: 'myOrderDetail', params: {orderId: 1}}">支付</router-link>
					</div>
				</card-order>
			</div>
		</tab>
	</div>
</template>

<script type="text/babel">
	import tab from 'components/common/tab/tab.vue'
	import cardOrder from 'components/common/card/card-order.vue'
	import img1 from 'assets/img/shop-cart.jpg'

	export default {
		components: {
			tab, cardOrder
		},
		data () {
			return {
				selectedIndex: 0,
				cardOrderData: {
					title: '123214124',
					deleteBtn: true,
					orderData: {
						imgPath: img1,
						title: '汉字思维大礼包(20个故事)',
						version: '18分钟版',
						date: '2016-03-01',
						value: '￥30.00',
						num: '一'
					}
				}
			}
		},
		methods: {
			onSelectedIndexChange (val) {
				// 此处改为获取后台数据
				this.selectedIndex = val
			},
			deleteCard () {
				console.log(1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
</style>