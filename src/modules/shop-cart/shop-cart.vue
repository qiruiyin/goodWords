<!-- 
	购物车
 -->
<template>
	<div class="shop-cart">
		<imgText :img-text-data="item" v-for="item in cartDatas"></imgText>
		<div class="btns">
			<div class="select-all">全选</div>
			<div class="delete">删除</div>
			<div class="next" @click="next">下一步</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import imgText from 'components/common/img-text/img-text.vue'
	import img1 from 'assets/img/shop-cart.jpg'

	export default {
		components: {
			imgText
		},
		data () {
			return {
				cartDatas: [
					{
						imgPath: img1,
						title: '汉字思维大礼包',
						price: '￥2000.00',
						num: 5
					},{
						imgPath: img1,
						title: '汉字思维大礼包',
						price: '￥2000.00',
						num: 5
					},{
						imgPath: img1,
						title: '汉字思维大礼包',
						price: '￥2000.00',
						num: 5
					}
				]
			}
		},
		methods: {
			next () {
				this.$router.push({name: 'confirmOrder'});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	.btns {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: px2em(110);
		line-height: px2em(110);
		background-color: $colorBgWhite;
		@include font-dpr($font);
		color: $colorArticle;
		border-top: 2px solid $colorLine;
		display: flex;
		text-align: center;

		.select-all {
			width: px2em(200);
		}

		.delete {
			flex: 1;
			color: $colorTitleRed;
		}

		.next {
			width: px2em(300);
			color: $colorWhite;
			background-color: $colorTitleRed;
		}
	}
</style>