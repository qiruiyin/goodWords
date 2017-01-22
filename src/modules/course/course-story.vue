<!-- 
 汉字思维故事列表
 -->

<template>
	<div>
		<search></search>
		<card v-for="item in cardDatas" :card-data="item">
		</card>
		<cart ref="cartRef"></cart>
	</div>
</template>

<script type="text/babel">
	import search from 'components/common/search/search.vue'
	import card from 'components/common/card/card.vue'
	import cart from 'components/common/cart/cart.vue'


	export default {
		components: {
			search, card, cart
		},
		data () {
			return {
				cardDatas : [],
				subFolderId : '',
				storylistUrl : "course/storyList"
			}
		},
		created (){
			var vm = this;
			vm.fetchData();
		},
		methods: {
			fetchData(){
				var vm = this;
				vm.subFolderId = this.$route.params.courseId;
				this.$http.get(this.storylistUrl, {params:{"subForderId" : this.subFolderId}}).then(function(response){
				   vm.cardDatas = response.data.t;
				})
			},
			addCartNum(num){
				 this.$refs.cartRef.addCartNum(num);
			}
		},
		watch:{
			  '$route':'fetchData'
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