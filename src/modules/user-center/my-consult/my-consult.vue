<!--
	我的咨询 
 -->

<template>
	<div class="my-consult">
		<tip  :card-data="consultList"  msg="您还没有咨询记录"></tip>
		<div class="question" v-for="item in consultList">
			<div class="question-header">
				{{ item.consultTitle}}
				<div class="question-time">{{ item.consultDate }}</div>
			</div>
			<div class="question-body">
				<div>
						<p>{{ item.consultContent }}</p>
				</div>
				<div v-if='item.consultAnswer != null && item.consultAnswer != ""' class="question-answer admin">
					<p>{{ item.consultAnswer }}</p>
				</div>
				
			</div>
		</div>

		<router-link class="icon-edit" :to="{name: 'myConsultAdd'}"></router-link>
	</div>
</template>

<script type="text/babel">
	import tip from 'components/common/card/tip.vue'
	
	export default {
		components: {
			tip
		},
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
				},
				consultList: [],
				consultListUrl: 'usercenter/counsultList'
			}
		},
		mounted : function(){
			var vm = this;
			this.$http.get(this.consultListUrl).then(function(response){
				vm.consultList = response.data.t;
				
			})
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
		position: relative;
		margin-bottom: px2em(30);
		color: $colorArticle;
	}

	.question-answer {
		position: relative;
		margin-bottom: px2em(30);

		p {
			position: relative;
			z-index: 3;
		}

		&.admin {
			// min-height: px2em(140);
			padding: px2em(20) px2em(30);
			// padding-right: px2em(160);
			border-radius: px2em(140);
			background-color: $colorBg;
			color: $colorSubText;
			margin-top: px2em(30);

			// &:before {
			// 	content: "";
			// 	position: absolute;
			// 	top: 0;
			// 	left: 0;
			// 	width: 100%;
			// 	height: px2em(140);
			// 	border-radius: px2em(140);
			// 	background-color: $colorBg;
			// 	z-index: 1;
			// }

			// &:after {
			// 	content: "";
			// 	position: absolute;
			// 	top: px2em(10);
			// 	right: px2em(10);
			// 	width: px2em(120);
			// 	height: px2em(120);
			// 	border-radius: px2em(120);
			// 	background: url("~assets/img/hzz.png") no-repeat;
			// 	background-position: center;
			// 	background-color: $colorBgWhite;
			// 	background-size: auto 80%;
			// 	z-index: 1;
			// }
		}
	}

	.icon-edit {
		position: fixed;
		bottom: px2em(40);
		right: px2em(40);
	}
	
	.no-result{
	    padding-top: 40px;
		text-align: center;
	}
</style>