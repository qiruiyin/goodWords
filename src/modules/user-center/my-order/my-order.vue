<!-- 
	我的订单列表
 -->

<template>
	<div class="my-order">
		<tab @on-selectedIndex-change="onSelectedIndexChange">
			<div v-if="selectedIndex == 0">
				<tip  :card-data="cardOrderData"  msg="没有订单"></tip>
				<card-order v-if="!item.hide" :card-order-data="item" v-for="(item, index) in cardOrderData" @on-delete="deleteCard">
					<div class="btns" slot="footer">
						<div v-if='item.orderStatus == "未支付"' class="btn btn-cancel" @click="cancelOrder(item, index)">取消</div>
						<router-link v-if='item.orderStatus == "未支付"' class="btn btn-active" :to="{name: 'myOrderDetail', params: {orderId: item.orderId}}">支付</router-link>
						<div class="status" v-if='item.orderStatus == "支付"'>已支付</div>
					</div>
				</card-order>
			</div>

			<div v-if="selectedIndex == 1">
				<tip  :card-data="payCardOrderData"  msg="没有已支付订单"></tip>
				<card-order :card-order-data="item" v-for="item in payCardOrderData" @on-delete="deleteCard">
					<div class="btns" slot="footer">
						<div class="status">已支付</div>
					</div>
				</card-order>
			</div>
			
			<div v-if="selectedIndex == 2">
				<tip  :card-data="unpayCardOrderData"  msg="没有未支付订单"></tip>
				<card-order v-if="!item.hide" :card-order-data="item" v-for="item in unpayCardOrderData" @on-delete="deleteCard">
					<div class="btns" slot="footer">
						<div class="btn btn-cancel" @click="cancelOrder(item)">取消</div>
						<router-link class="btn btn-active" :to="{name: 'myOrderDetail', params: {orderId: item.orderId}}">支付</router-link>
					</div>
				</card-order>
			</div>
		</tab>
	</div>
</template>

<script type="text/babel">
	import tab from 'components/common/tab/tab.vue'
	import cardOrder from 'components/common/card/card-order.vue'
	import tip from 'components/common/card/tip.vue'
	import img1 from 'assets/img/shop-cart.jpg'

	export default {
		components: {
			tab, cardOrder, tip
		},
		data () {
			return {
				selectedIndex: 0,
				/**
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
				},
				**/
				cardOrderData: [],
				myOrderListUrl: 'order/orderList',
				cancelOrderUrl: 'order/cancelOrder'
			}
		},
		computed:{
			unpayCardOrderData : function(){
				return this.cardOrderData.filter(function (orderData) {
					return orderData.orderStatus == "未支付";
				})
			},
			payCardOrderData : function(){
				return this.cardOrderData.filter(function (orderData) {
					return orderData.orderStatus == "支付";
				})
			}
		},
		methods: {
			onSelectedIndexChange (val) {
				// 此处改为获取后台数据
				this.selectedIndex = val
			},
			deleteCard () {
				console.log(1);
			},
			cancelOrder(item, index){
				var vm = this;
				
				layer.open({
					content: '您确认取消这个订单吗？'
					,btn: ['删除', '再考虑下']
					,skin: 'footer'
					,yes: function(index){
						layer.close(index);
						vm.$http.post(vm.cancelOrderUrl, {'orderId': item.orderId}).then(function(response){
						   item.hide = true;
						})
					}
				  });
				
			}
		},
		mounted : function(){
			var vm = this;
			this.$http.get(this.myOrderListUrl).then(function(response){
               vm.cardOrderData = response.data.t;
			})
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	.no-result{
	    padding-top: 40px;
		text-align: center;
	}
</style>