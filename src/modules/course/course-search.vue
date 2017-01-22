<!-- 
 汉字思维单集
 -->

<template>
	<div>
		<search :search-word-current="searchWord" :search-type-current="searchType" :current-story="storyId" :myCourse="myCourse"></search>
		<tip  :card-data="cardDatas"  msg="没有找到相关的内容"></tip>
		<card v-for="item in cardDatas" :card-data="item"  @changCartNum="addCartNum">
		</card>
		<cart ref="cartRef"></cart>
	</div>
</template>

<script type="text/babel">
	import search from 'components/common/search/search.vue'
	import card from 'components/common/card/card.vue'
	import cart from 'components/common/cart/cart.vue'
	import tip from 'components/common/card/tip.vue'

	import card1 from 'assets/img/card1.jpg'
	import card2 from 'assets/img/card2.jpg'

	export default {
		components: {
			search, card, cart,tip
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
				noResult:false,
				storyId: '',
				searchType: '',
				searchWord: '',
				cardDatas : [],
				myCourse : false,
				coureslistUrl : "course/lessonList",
				serchCourseListUrl : "course/searchCourse"
			}
		},
		created (){
			var vm = this;
			vm.fetchData();
		},
		methods: {
			fetchData(){
				this.storyId = this.$route.params.storyId;
				this.searchType = this.$route.params.searchType;
				this.searchWord = this.$route.params.searchWord;
				this.myCourse = this.$route.params.myCourse;
				var vm = this;
				if(this.storyId == "all"){
					this.storyId = "";
				}
				this.$http.post(this.serchCourseListUrl, {"storyId" : this.storyId, 'searchType' : this.searchType, "searchWord" : this.searchWord, "myCourse": this.myCourse}).then(function(response){
				   vm.cardDatas = response.data.t;
				   if(vm.cardDatas.length == 0){
						vm.noResult = true;
				   }else{
						vm.noResult = false;
					}
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
	.no-result{
	    padding-top: 40px;
		text-align: center;
	}
</style>