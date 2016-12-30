<!-- 
 我的课程
 -->

<template>
	<div>
		<search></search>
		<card v-for="item in cardDatas" :card-data="item">
		</card>
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
						url: 'myCourse',
						params: {
							storyId: 1
						},
						title: '盘古开天',
					},{
						imgPath: card2,
						url: 'myCourse',
						params: {
							storyId: 2
						},
						title: '女娲造人',
					},{
						imgPath: card1,
						url: 'myCourse',
						params: {
							storyId: 3
						},
						title: '伏羲结网',
					}
				]
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