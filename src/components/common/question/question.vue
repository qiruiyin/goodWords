<!-- 
	问题组件（只考虑单选，默认是ABCDE）
 -->

<template>
	<div class="question">
		<div class="label">
			<span>{{ questionIndex }}</span>
			<label v-html="questionData.questionDesc"></label>
			<div v-if="showResult" :class="['icon', selected!= questionData.correctAnswer ? 'icon-wrong':'icon-right']"></div>
		</div>
		<ul class="options">
			<li :class="{selected: item.optionValue == selected}" v-for="(item, index) in questionData.options" @click="setSelected(item.optionValue)" v-html='item.optionName'>
			</li>
		</ul>
	</div>
</template>

<script type="text/babel">
	export default {
		props: ['questionData', 'questionIndex', 'showResult', 'clear'],
		data () {
			return {
				// questionData: {
 			// 		label: '汉字”大“表示：（）', //问题内容
				// 	options: [ // 选项
				// 		{
				// 			name: '站立着张开双臂的人'
				// 		},{
				// 			name: '蹲着的人'
				// 		}
				// 	],
				// 	selected: 1, // 选择的结果
				// 	rightOptions: 0, // 正确的结果
				// 	result: true // 是否显示正确与否
				// }
				selected: ''
			}
		},
		mounted () {
			setTimeout(function(){
				// 图片大小处理
				let dpr = document.getElementsByTagName('html')[0].dataset.dpr;

				[].map.call(document.querySelectorAll('.question img'), function(elem, index){
					console.log(elem.style.width, elem.offsetWidth, dpr);
					elem.style.width = elem.style.width || elem.offsetWidth * dpr + 'px'
				})
			}, 1000);
		},
		methods: {
			setSelected (index) {
				if(this.selected  == index){
					return;
				}
				
				if(this.questionData.correctAnswer == index){
					this.$emit('increment')
				}else if(this.questionData.correctAnswer == this.selected){
					this.$emit('reduce')
				}

				this.selected  = index;
			}
		},
		watch:{
			clear(val){
				this.selected = '';
			}
		}
	}
</script>

<style lang="scss">
	@import '~assets/css/vars', '~assets/css/functions';
	// .question .label {
	// 	img {
	// 		height: px2em(42);
	// 	}
	// }
</style>
<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	$questionPadding: px2em(30);

	$questionOptions: 'A' 'B' 'C' 'D' 'E';

	.question {
		padding: $questionPadding $paddingRight $questionPadding $paddingLeft;
		background-color: $colorBgWhite;
		@include font-dpr($font);
		color: $colorTitle;
		margin-bottom: $marginBottom;
	}

	.label {
		span {
			float: left;
			width: px2em(30);
		}

		label {
			color: $colorArticle;
		}

		.icon {
			float: right;
		}
	}
	
	.options {
		padding-left: px2em(40);

		li {
			position: relative;
			margin-top: px2em(20);
			padding-left: px2em(60);

			&:before {
				content: "";
				position: absolute;
				left: 0;
				width: px2em(40);
				height: px2em(40);
				line-height: px2em(40);
				text-align: center;
				color: $colorTitleRed;
				border: 1px solid $colorTitleRed;
				border-radius: px2em(40);
			}

			&.selected {
				&:before {
					color: $colorWhite;
					background-color: $colorTitleRed;
				}
			}
		}
	}

	@for $i from 1 through 5 {
		.options li:nth-child(#{$i}):before {
			content: nth($questionOptions, $i);
		}
	}
</style>