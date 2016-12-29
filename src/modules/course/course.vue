<!-- 
 汉字思维课
 -->
<template>
	<div>
		<search></search>
		<img class="img banner" src="~assets/img/banner.jpg" alt="banner">
		<card v-for="item in cardDatas" :card-data="item">
		</card>
		<card :card-data="cardSimple"></card>
		<cart></cart>
	</div>
</template>

<script type="text/babel">
	import search from 'components/common/search/search.vue'
	import card from 'components/common/card/card.vue'
	import cart from 'components/common/cart/cart.vue'

	import card1 from 'assets/img/card1.jpg'
	import card2 from 'assets/img/card2.jpg'

	export default {
		components: {
			search, card, cart
		},
		data () {
			return {
				cardDatas: [
					{
						imgPath: card1,
						url: 'courseSpree',
						params: { 'courseId': 1 },
						title: '汉字思维免费礼包（5集）',
						price: '￥2000.00',
						num: 4,
						actions: ['zan']
					},{
						imgPath: card2,
						url: 'courseSpree',
						params: { 'courseId': 1 },
						title: '汉字思维免费礼包（5集）',
						price: '￥2000.00',
						num: 5,
						actions: ['zan', 'store']
					},{
						imgPath: card1,
						url: 'courseSpree',
						params: { 'courseId': 1 },
						title: '汉字思维免费礼包（5集）',
						price: '￥2000.00',
						num: 5,
						actions: ['zan', 'store', 'cart']
					}
				],
				cardSimple: {
					imgPath: card1,
					url: 'courseSimple',
					params: { 'courseId': 1 },
					title: '汉字思维免费礼包（5集）',
					price: '￥2000.00',
					num: 4,
					actions: ['zan']
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	.banner {
		margin-bottom: $marginBottom;
	}
</style>