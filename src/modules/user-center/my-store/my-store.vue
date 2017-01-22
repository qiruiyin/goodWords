<template>
	<div class="my-store">
		<tip :card-data="cardDatas" msg="您还未收藏课程"></tip>
		<card v-for="item in cardDatas" :card-data="item">
		</card>
	</div>
</template>

<script type="text/babel">
	import card from 'components/common/card/card.vue'
	import tip from 'components/common/card/tip.vue'

	import card1 from 'assets/img/card1.jpg'
	import card2 from 'assets/img/card2.jpg'
	

	export default {
		components: {
			card, tip
		},
		data () {
			return {
				 
				cardDatas: [],
				storeListUrl: 'usercenter/storeList'
			}
		},
		mounted : function(){
			var vm = this;
			this.$http.get(this.storeListUrl).then(function(response){
               vm.cardDatas = response.data.t;
			   
			})
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	.no-result{
	    padding-top: 40px;
		text-align: center;
	}
</style>