<!-- 
	购买的卡片
 -->

<template>
	<div class="card">
		<div class="card-header">
			<router-link :to="{ name: cardData.url, params: cardData.params }">
				<img class="img" :src="cardData.imgPath" alt="card" v-if="cardData.imgPath">
			</router-link>
			<div class="card-status" v-if="cardData.goodsIsNew"></div>
		</div>
		<div class="card-body">
			<h3>{{ cardData.title }} <span v-if='cardData.slogan && showDetail'>&nbsp&nbsp;{{cardData.slogan}}</span></h3>
			<div v-if="cardData.price" class="price">{{ cardData.price }}<span>  &nbsp; {{ cardData.num }}集</span></div>
			<ul class="actions" v-if="cardData.actions">
				<li :class="item.choosed ? 'icon-'+item.value+'_active active' : 'icon-'+item.value" v-for="(item, index) in cardData.actions" @click="setActionNums(item, cardData)">
					{{item.choosedNum && item.choosed? item.choosedNum : item.name }}
				</li>
			</ul>

			<ul class="status" v-if="cardData.status">
				<li :class="[!item.choosed ? 'icon-'+item.value : 'active icon-'+item.value+'_active']" v-for="(item, index) in filterStatus">
					已{{ item.choosed ? item.name : item.nameFalse }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		props: ['cardData', 'showDetail'],
		data () {
			return {
				cardTitle: "",
				/**
				actions: [
					{
						name: "点赞",
						value: 'zan',
						choosed: false,
						num: 0
					},{
						name: '收藏',
						value: 'store',
						choosed: false,
						num: 0
					},{
						name: '购物车',
						value: 'cart',
						choosed: false,
						num: 0
					}
				],
				**/
				
				status: [
					{
						name: '收藏',
						nameFalse: '取消',
						value: 'store'
					}
				],
				addLikeUrl: 'usercenter/addLike',
				unLikeUrl: 'usercenter/unLike',
				addStroeUrl: 'usercenter/addStore',
				unStoreUrl: 'usercenter/unStore',
				addShopcartUrl: 'shopcart/addShopcart',
				unShopcartUrl: 'shopcart/unShopcart'
			}
		},
		computed: {
			filterActions () {
				let actions = this.cardData.actions || []
				return this.cardData.actions.filter(function(elem, index) {
					return actions.indexOf(elem.value) != -1
				})
			},
			filterStatus () {
				let cardDataStatus = this.cardData.status || []
				let status = this.status
				cardDataStatus.map(function(elem, index){
					for(let i = 0; i < status.length; i++) {
						if (elem.value == status[i].value) {
							elem = Object.assign(elem, status[i]);		
						}
					} 
				})
				return cardDataStatus
			}
		},
		methods: {
			setActionNums(item, course) {
				var vm = this;
				//this.actions[ind].num += this.actions[ind].choosed ? -1 : 1
				
				if(item.value == 'zan' || item.value == 'store'){
					if(!item.choosedNum){
						item.choosedNum = 0;
					}
					item.choosedNum += item.choosed ? -1 : 1
				}
				
				item.choosed = !item.choosed
				if(item.choosed){
					if(item.value == 'zan'){
						vm.$http.post(vm.addLikeUrl, course.params)
							.then((response) => {
							})
					}
					if(item.value == 'store'){
						vm.$http.post(vm.addStroeUrl, course.params)
							.then((response) => {
							})
					}
					if(item.value == 'cart'){
						vm.$http.post(vm.addShopcartUrl, course.params)
							.then((response) => {
								this.$emit('changCartNum', 1);
							})
					}
				}else{
					if(item.value == 'zan'){
						vm.$http.post(vm.unLikeUrl, course.params)
							.then((response) => {
							})
					}
					if(item.value == 'store'){
						vm.$http.post(vm.unStoreUrl, course.params)
							.then((response) => {
							})
					}
					if(item.value == 'cart'){
						vm.$http.post(vm.unShopcartUrl, course.params)
							.then((response) => {
								this.$emit('changCartNum', -1);
							})
					}
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	.card {
		position: relative;
		margin-bottom: $marginBottom;
		@include font-dpr($fontLabel);
		background: $colorBgWhite;
	}

	.card-status {
		position: absolute;
		top: px2em(20);
		right: px2em(20);
		width: px2em(70);
		height: px2em(70);
		background: url('~assets/img/spriter/new.png') no-repeat;
		background-size: 100% 100%;
	}

	.card-body {
		position: relative;
		padding: px2em(25) $paddingRight px2em(25) $paddingLeft
	}

	h3 {
		@include font-dpr($font);
		color: $colorTitleBlack;
		font-weight: normal;
		
		span{
			color: $colorTitleRed;
		}
	}

	.price {
		padding-top: px2em(20);
		color: $colorTitleRed;
		@include font-dpr($font);

		span {
			@include font-dpr($fontLabel);
			color: $colorSubText;
		}
	}

	.actions, .status {
		position: absolute;
		top: px2em(60);
		right: $paddingRight;
		@include font-dpr($fontLabel);

		li {
			position: relative;
			float: left;
			width: px2em(100);
			padding-top: px2em(50);
			display: block;
			text-align: center;
			color: $colorTips;
		}
	}
	
	.actions {
		.active {
			color: $colorTitleRed;
		}
	}

	.status {
		top: px2em(100);

		li {
			width: px2em(140);
			padding-top: 0;
			padding-left: px2em(40);
			line-height: px2em(50);
			background-position: left !important;

			&.active {
				color: $colorTitleRed;
			}
		}
	}
</style>