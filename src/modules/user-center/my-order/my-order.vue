<!-- 
	我的订单列表
 -->

<template>
	<div class="my-order">
		<tab @on-selectedIndex-change="onSelectedIndexChange">
			<div v-if="selectedIndex == 0">
				<card-order v-for="item in 3">
					<div class="btns" slot="footer">
						<div class="btn">取消</div>
						<router-link class="btn" :to="{name: 'myOrderDetail', params: {orderId: 1}}">支付</router-link>
					</div>
				</card-order>
			</div>

			<div v-if="selectedIndex == 1">
				<card-order v-for="item in 3">
					<div class="btns" slot="footer">
						<div class="status">已支付</div>
					</div>
				</card-order>
			</div>
			<div v-if="selectedIndex == 2">
				<card-order v-for="item in 3">
					<div class="btns" slot="footer">
						<div class="btn">取消</div>
						<router-link class="btn" :to="{name: 'myOrderDetail', params: {orderId: 1}}">支付</router-link>
					</div>
				</card-order>
			</div>
		</tab>
	</div>
</template>

<script type="text/babel">
	import tab from 'components/common/tab/tab.vue'
	import cardOrder from 'components/common/card/card-order.vue'

	export default {
		components: {
			tab, cardOrder
		},
		data () {
			return {
				selectedIndex: 0
			}
		},
		methods: {
			onSelectedIndexChange (val) {
				// 此处改为获取后台数据
				this.selectedIndex = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
</style>