<!-- 
	我的课件详情
 -->

<template>
	<div>
		<card :card-data="cardData"></card>
		<div class="article">
			<div class="article-body article-body-padding">
				<template v-for="item in courseDesc.contents">
					<p>{{ item.content }}</p>
				</template>
			</div>
		</div>
		
		<div class="practice">
			<div class="practice-header">相关课程习题</div>
			<question :question-data="item" :question-index="index + 1" v-for="(item, index) in courseQuestion"></question>
			<div class="btn btn-big">老师评语</div>

			<div class="erweima">
				<p>扫一扫下方二维码加入我们的课后讨论群</p>
				<img src="~assets/img/erweima.jpg" alt="erweima">
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import card from 'components/common/card/card.vue';
	import question from 'components/common/question/question.vue';
	
	import courseImg from 'assets/img/course-detail.jpg';

	export default {
		components: {
			card, question
		},
		data () {
			return {
				cardData: {
					imgPath: courseImg,
					url: '',
					params: {},
					title: '盘古开天第1集',
				},
				courseDesc: {
					contents: [
						{
							content: 'Lorem ipsum dolor sit amet, consecteture adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque'
						}
					]
				},
				courseQuestion: [
					{
						label: '汉字”大“表示：（）',
						options: [
							{
								name: '站立着张开双臂的人'
							},{
								name: '蹲着的人'
							}
						],
						selected: 1,
						rightOptions: 0,
						result: true
					},{
						label: '汉字”大“表示：（）',
						options: [
							{
								name: '站立着张开双臂的人'
							},{
								name: '蹲着的人'
							}
						],
						selected: 1,
						rightOptions: 0,
						result: true
					},{
						label: '汉字”大“表示：（）',
						options: [
							{
								name: '站立着张开双臂的人'
							},{
								name: '蹲着的人'
							}
						],
						selected: 1,
						rightOptions: 0,
						result: true
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	.btn {
		height: px2em(84);
		margin: 0 $paddingRight $marginBottom $paddingLeft;
		line-height: px2em(84);
		color: $colorWhite;
		background-color: $colorTitleRed;
		text-align: center;
		@include font-dpr($font);
		border-radius: 6px;
	}
	
	.practice {

	}

	.practice-header {
		line-height: px2em(110);
		@include font-dpr($font);
		text-align: center;
		background-color: $colorBgWhite;
		border-bottom: 1px solid $colorLine;
	}
	.erweima {
		padding: $paddingRight;
		background-color: $colorBgWhite;
		text-align: center;

		p {
			margin-bottom: px2em(30)
		}
	}
</style>