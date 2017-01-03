<template>
	<div class="course-spree">
		<card class="spree-card" :card-data="courseData"></card>
		<ul class="time-choose">
			<li :class="{'current': index == timeCurrent}" v-for="(item, index) in timeChoose" @click="setTimeCurrent(index)">{{ item.name }}版</li>
		</ul>

		<div class="article">
			<div class="article-header">{{ courseDesc.title }}</div>
			<div class="article-body article-body-padding">
				<template v-for="item in courseDesc.contents">
					<p>{{ item.content }}</p>
				</template>
			</div>
		</div>

		<div class="article">
			<div class="article-header">{{ recommendCourse.title }}</div>
			<div class="article-body article-body-bg">
				<card v-for="item in recommendCourse.data" :card-data="item"></card>
			</div>
		</div>
		
		<div class="footer-btn">
			<div class="icon"><div class="icon-cart_active"></div>加入购物车</div>
			<div class="submit" @click="buy">立即购买</div>
		</div>
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
				courseData: {
					imgPath: card1,
					url: '',
					params: '',
					title: '汉字思维免费礼包（5集）',
					price: '￥2000.00',
					num: 5,
					actions: ['zan', 'store', 'cart']
				},
				timeChoose: [
					{
						name: '大朋友',
					},{
						name: '小朋友',
					}
				],
				timeCurrent: -1,
				courseDesc: {
					title: '课程介绍',
					contents: [
						{
							content: 'Lorem ipsum dolor sit amet, consecteture adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque'
						},{
							content: 'penatibus et magnis dis parturient montes, nascetur ridiculusmus. Nam fermentum, nulla lustus pharetra vulputate, felis tell us mollis orci, sed rhoncus sapien nunc eget odio.'
						}
					]
				},
				recommendCourse: {
					title: '推荐课程',
					data: [
						{
							imgPath: card1,
							url: 'courseSimple',
							params: { 'courseId': 1 },
							title: '汉字思维免费礼包（5集）',
							price: '￥2000.00',
							num: 4,
						},{
							imgPath: card2,
							url: 'courseSimple',
							params: { 'courseId': 1 },
							title: '汉字思维免费礼包（5集）',
							price: '￥2000.00',
							num: 5,
						},{
							imgPath: card1,
							url: 'courseSimple',
							params: { 'courseId': 1 },
							title: '汉字思维免费礼包（5集）',
							price: '￥2000.00',
							num: 5
						}
					]
				}
			}
		},
		methods: {
			setTimeCurrent (index) {
				this.timeCurrent = index
			},
			buy () {
				// 先获取要传递的数据，
				this.$router.push({name: 'courseSimple', params: {'courseId': 1}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	$btnBg: $colorTitleRed;

	.course-spree {
		.spree-card {
			margin-bottom: 0;
		}	
	}
	
	.time-choose {
		width: 100%;
		padding: px2em(20);
		margin-bottom: $marginBottom;
		background-color: $colorBgWhite;
		border: 1px solid $colorLine;

		li {
			padding: px2em(20);
			border: 1px solid $colorLine;
			margin-right: px2em(20);
			border-radius: 6px;
			display: inline-block;

			&.current {
				border-color: $colorTitleRed;
				color: $colorTitleRed;
			}
		}
	}

	// .btn-buy {
	// 	position: fixed;
	// 	left: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	width: 100%;
	// 	height: px2em(110);
	// 	line-height: px2em(110);
	// 	background-color: $btnBg;
	// 	text-align: center;
	// 	@include font-dpr($font);
	// 	color: $colorWhite;
	// }

	.footer-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: px2em(110);
		line-height: px2em(110);
		background-color: $colorBgWhite;
		text-align: center;
		display: flex;

		.icon {
			position: relative;
			width: px2em(320);
			color: $colorSubText;
		}

		.submit {
			flex: 1;
			color: $colorWhite;
			background-color: $colorTitleRed;
		}
	}

	.icon-cart_active {
		position: absolute;
		top: 50%;
		left: px2em(40);
		margin-top: - px2em(20); //取自图片大小
	}
</style>