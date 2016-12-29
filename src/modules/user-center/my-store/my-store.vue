<template>
	<div class="my-store">
		<card v-for="item in cardDatas" :card-data="item">
		</card>
	</div>
</template>

<script type="text/babel">
	import card from 'components/common/card/card.vue'

	import card1 from 'assets/img/card1.jpg'
	import card2 from 'assets/img/card2.jpg'

	export default {
		components: {
			card
		},
		data () {
			return {
				cardDatas: [
					{
						imgPath: card1,
						url: 'courseSpree',
						params: {},
						title: '汉字思维免费课',
						price: '￥2000.00',
						status: [
							{
								value: 'store',
								choosed: true
							}
						]
					},{
						imgPath: card2,
						url: 'courseSpree',
						params: {},
						title: '汉字思维免费礼包（5集）',
						price: '￥2000.00',
						status: [
							{
								value: 'store',
								choosed: false
							}
						]
					},{
						imgPath: card1,
						url: 'courseSpree',
						params: {},
						title: '汉字思维免费礼包（5集）',
						price: '￥2000.00',
						status: [
							{
								value: 'store',
								choosed: true
							}
						]
					}
				]
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
</style>