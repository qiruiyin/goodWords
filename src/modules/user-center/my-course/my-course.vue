<!-- 
 我的课程
 -->

<template>
	<div>
		<search  myCourse='true'></search>
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
				/**
				cardDatas: [
					{
						imgPath: card1,
						url: 'myCourseDetail',
						params: {
							courseId: 1
						},
						title: '盘古开天第1集',
					},{
						imgPath: card2,
						url: 'myCourseDetail',
						cardNew: true,
						params: {
							courseId: 1
						},
						title: '盘古开天第2集',
					},{
						imgPath: card1,
						url: 'myCourseDetail',
						params: {
							courseId: 1
						},
						title: '盘古开天第3集',
					}
				],
				**/
				
				cardDatas: [],
				storyId : '',
				myLessonlistUrl: 'usercenter/myLessonList'
			}
		},
		created (){
			var vm = this;
			vm.fetchData();
		},
		methods: {
			fetchData(){
				this.storyId = this.$route.params.storyId;
				var vm = this;
				this.$http.get(this.myLessonlistUrl, {params:{"storyId" : this.storyId}}).then(function(response){
				   vm.cardDatas = response.data.t;
				})
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
	
	.no-result{
	    padding-top: 40px;
		text-align: center;
	}
</style>