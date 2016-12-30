<!-- 
 	左侧信息，右侧数据进入下一页面
 -->

<template>
	<router-link :to="{name: cellLinkData.url, params: cellLinkData.params}">
		<div :class="['cell-link', { 'no-arrow' : cellLinkData.noArrow}]">
			<label :class="{ icon: cellLinkData.labelIcon }"><span :class="'icon-'+cellLinkData.labelIcon" v-if="cellLinkData.labelIcon"></span>{{ cellLinkData.label }}</label>
			<span :class="[cellLinkData.nameColor, { icon: cellLinkData.nameIcon }]"><span :class="'icon-'+cellLinkData.nameIcon" v-if="cellLinkData.nameIcon"></span>{{ cellLinkData.name }}</span>
			<p v-if="cellLinkData.desc != ''">
				{{ cellLinkData.desc }}
			</p>
		</div>	
	</router-link>
</template>

<script type="text/babel">
	export default {
		props: ['cellLinkData'],
		data () {
			return {
				// cellLinkData: {
				//  url: '', // 连接地址（待完善）
				//  params: '', // 参数
				// 	label: '叶良辰', // 左侧名字 
				// 	name: '13845675678', // 右侧信息
				// 	value: '',	// 值
				// 	desc: '上海市虹口区广纪路838号B座4楼', //详情介绍
				//  icon: '', // 图标（此处未完善，可以设置左右两边的）
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	@import '~assets/css/spriters';

	$paddingCell: px2em(30);

	a {
		display: block;

		&:hover {
	    text-decoration: none;
		}

		&.cell-link-bottom {
			margin-bottom: $marginBottom;

			.cell-link {
				border-top: 1px solid $colorLine;
			}
		}
	}

	.cell-link {
		@extend %clearfix;
		position: relative;
		width: 100%;
		min-height: px2em(60);
		padding: $paddingCell $paddingRight + px2em(20) $paddingCell $paddingLeft;
		background-color: $colorBgWhite;
		border-bottom: 1px solid $colorLine;
		line-height: 1.5;
		@include font-dpr($fontLabel);
		color: $colorTitle;
		
		&:after {
			content: "";
			position: absolute;
			top: 50%;
			right: $paddingRight;
			width: px2em(20);
			height: px2em(20);
			margin-top: - px2em(20)/2;
			border-top: 1px solid $colorLine;
			border-right: 1px solid $colorLine;
			transform: rotate(45deg);
		}

		&.no-arrow {
			padding-right: $paddingRight;
			
			&:after {
				display: none;
			}
		}
	}

	.icon {
		& > span {
			float: left;
			margin-right: px2em(15);
			display: block;
		}
	}

	span {
		float: right;
	}

	p {
		color: $colorSubText;
	}

	.gray {
		color: $colorSubText;
	}

	.red {
		color: $colorTitleRed;
	}
</style>