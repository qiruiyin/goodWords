<!-- 
	购物车
 -->
<template>
	<div class="shop-cart">
		<imgText :ref="'imgText'+index" :img-text-data="item" v-for="(item, index) in cartDatas" @on-check="onCheck">
		</imgText>
		<div class="btns">
			<div class="select-all" @click="selectAll">
				<div :class="['checkbox', checkAll ? 'icon-check_yuan': 'icon-uncheck_yuan']"></div>
				全选
			</div>
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
						version: '18分钟版',
						price: '￥2000.00',
						num: 5,
						hasCheck: true,
						check: true
					},{
						imgPath: img1,
						title: '汉字思维大礼包',
						version: '18分钟版',
						price: '￥2000.00',
						num: 5,
						hasCheck: true,
						check: false
					},{
						imgPath: img1,
						title: '汉字思维大礼包',
						version: '18分钟版',
						price: '￥2000.00',
						num: 5,
						hasCheck: true,
						check: false
					}
				],
				checkAll: false
			}
		},
		methods: {
			next () {
				this.$router.push({name: 'confirmOrder'});
			},
			selectAll () {
				this.checkAll = true
				for (let key in this.$refs) {
					this.$refs[key][0].setChecked()
				}
			},
			onCheck (val) {
				let data
				if (val) {
					data = this.cartDatas.every(function(elem) {
						return elem.check == true
					})
					if (data) this.checkAll = true
				} else {
					this.checkAll = false
				}
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

	.select-all {
		width: px2em(200);

		.checkbox {
			position: absolute;
			top: 50%;
			left: px2em(20);
			margin-top: - px2em(18);
		}
	}
</style>