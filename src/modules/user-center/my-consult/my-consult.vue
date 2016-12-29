<!--
	我的咨询 
 -->

<template>
	<div class="my-consult">
		<div class="question" v-for="item in 3">
			<div class="question-header">
				{{ questionData.title }}
				<div class="question-time">{{ questionData.date }}</div>
			</div>
			<div class="question-body">
				<template v-for="item in questionData.answers">
					<div :class="['question-answer', {admin: item.type == 'admin'}]">
						<p>{{ item.content }}</p>
					</div>
				</template>
			</div>
		</div>

		<div class="btn btn-big btn-submit">编辑</div>
	</div>
</template>

<script type="text/babel">
	export default {
		data () {
			return {
				questionData: {
					title: '请问如何才能以优惠价格购买所有课程？',
					date: '2016-11-11',
					answers: [
						{
							content: '你好，我对汉字思维很感兴趣，请问如何才能购买所有的课程，有没有优惠呢？'
						},{
							type: 'admin',
							content: '亲，您好，您可以使用优惠券购买我们的商品，谢谢。'
						}
					]
				} 
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	.my-consult {
		width: 100%;
	}

	.question {
		padding: $paddingLeft $paddingRight $paddingLeft $paddingLeft; 
		background-color: $colorBgWhite;
		@include font-dpr($font);
		color: $colorTitle;
		line-height: 1.5;
		margin-bottom: px2em(30);
	}

	.question-header {
		margin-bottom: px2em(30);
		@extend %clearfix;
	}
	
	.question-time {
		float: right;
		color: $colorSubText;
	}

	.question-body {

	}

	.question-answer {
		position: relative;
		margin-bottom: px2em(30);

		p {
			position: relative;
			z-index: 3;
		}

		&.admin {
			padding: px2em(20) px2em(30);
			padding-right: px2em(160);
			
			&:before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: px2em(140);
				border-radius: px2em(140);
				background-color: $colorBg;
				z-index: 1;
			}

			&:after {
				content: "";
				position: absolute;
				top: px2em(10);
				right: px2em(10);
				width: px2em(120);
				height: px2em(120);
				border-radius: px2em(120);
				background-color: $colorBgWhite;
				z-index: 1;
			}
		}
	}
</style>