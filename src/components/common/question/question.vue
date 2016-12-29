<!-- 
	问题组件（只考虑单选，默认是ABCDE）
 -->

<template>
	<div class="question">
		<div class="label">
			<span>{{ questionIndex }}</span>
			<label>{{ questionData.label }}</label>
			<div v-if="questionData.result" :class="['icon', questionData.selected != questionData.rightOptions ? 'icon-wrong':'icon-right']"></div>
		</div>
		<ul class="options">
			<li :class="{selected: index == questionData.selected}" v-for="(item, index) in questionData.options" @click="setSelected(index)">
				{{ item.name }}
			</li>
		</ul>
	</div>
</template>

<script type="text/babel">
	export default {
		props: ['questionData', 'questionIndex'],
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
			}
		},
		methods: {
			setSelected (index) {
				this.questionData.selected = index;
			}
		}
	}
</script>

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
			width: px2em(30);
			display: inline-block;
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