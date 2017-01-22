<!-- 
 汉字思维单集
 -->

<template>
	<div>
		<search myCourse='false'></search>
		<card v-for="item in cardDatas" :card-data="item" @changCartNum="addCartNum">
		</card>
		<cart ref="cartRef"></cart>
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
				/**
				cardDatas: [
					{
						imgPath: card1,
						url: 'myCourseDetail',
						params: {
							courseId: 1
						},
						title: '盘古开天',
					},{
						imgPath: card2,
						url: 'myCourseDetail',
						params: {
							courseId: 1
						},
						title: '盘古开天第1集',
					},{
						imgPath: card1,
						url: 'myCourseDetail',
						params: {
							courseId: 1
						},
						title: '盘古开天第2集',
					}
				],
				**/
				storyId : '',
				subForderId : '',
				cardDatas : [],
				coureslistUrl : "course/lessonList"
			}
		},
		created (){
			var vm = this;
			vm.fetchData();
		},
		methods: {
			fetchData(){
				this.storyId = this.$route.params.courseId;
				this.subForderId = this.$route.params.subForderId;
				var vm = this;
				this.$http.get(this.coureslistUrl, {params:{"storyId" : this.storyId, "subForderId" : this.subForderId}}).then(function(response){
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