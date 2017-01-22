<!-- 
 汉字思维课
 -->
<template>
	<div>
		<search myCourse='false'></search>
		<a :href="bannerUrl" v-if="bannerUrl = ''">
			<img class="img banner" :src="bannerSrc" alt="banner">
		</a>
		<img v-else class="img banner" :src="bannerSrc" alt="banner">
		
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
				/**cardDatas: [
					{
						imgPath: card1,
						url: 'courseSpree',
						params: { 'courseId': 1 },
						title: '汉字思维免费礼包（5集）',
						price: '￥2000.00',
						num: 4,
						actions: ['zan', 'store', 'cart']
					},{
						imgPath: card2,
						url: 'courseSpree',
						params: { 'courseId': 1 },
						title: '汉字思维免费礼包（5集）',
						price: '￥2000.00',
						num: 5,
						actions: ['zan', 'store', 'cart']
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
					title: '汉字思维课单集课程',
					price: '￥2000.00',
					num: 4,
					actions: ['zan', 'store', 'cart']
				},
				**/
				bannerSrc : '',
				bannerUrl : '',
				cardDatas : {},
				courselistUrl : "course/courseList",
				bannerPath : "course/getBanner",
				gridData : {}
			}
		},
		mounted : function(){
			var vm = this;
			this.$http.get(this.bannerPath).then(function(response){
               vm.bannerSrc = response.data.t.bannerPath;
			   if(response.data.t.bannerUrl){
					vm.bannerUrl = response.data.t.bannerUrl;
			   }
			   
			})
			
			this.$http.get(this.courselistUrl).then(function(response){
               vm.cardDatas = response.data.t;
			}); 
			
		},
		methods: {
			addCartNum(num){
				 this.$refs.cartRef.addCartNum(num);
			}
		},
		created: function(){
			if(__page && __page == "myStory"){
				this.$router.push({name: 'myStory'});
			}else if(__page && __page == "userCenter"){
				this.$router.push({name: 'userCenter'});
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