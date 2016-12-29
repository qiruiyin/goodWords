<!-- 
 搜索组件
 -->

<template>
	<div class="search">
		<div class="search-label">
			<div class="search-label-current" @click="setSearchLabel()">{{ searchLabelCurrent }}</div>
			<ul v-show="showLabelList" class="search-label-list">
				<li v-for="(item, index) in searchLabel" :data-value="item.value" @click="setSearchLabel(index)">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<div class="search-input">
			<input type="text" :placeholder="input.placeholder">
			<div class="search-btn icon-search_icon"></div>
		</div>
		<div class="menu">
			<div class="menu-btn icon-book" @click="setMenu()"></div>
			<ul v-show="showMenuList" class="menu-list">
				<li v-for="item in menuList">
					{{ item.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		data () {
			return {
				searchLabel: [
					{
						name: '汉字',
						value: 'chinese'
					},{
						name: '课程名',
						value: 'courseName'
					}
				],
				showLabelList: false,
				searchLabelCurrent: '汉字',
				input: {
					placeholder: '请输入搜索的汉字或课程名',
					value: ''
				},
				menuList: [
					{
						name: '盘古开天'
					},{
						name: '女娲造人'
					},{
						name: '其他故事'
					},{
						name: '其他故事'
					}
				],
				showMenuList: false
			}
		},
		methods: {
			setSearchLabel (ind = -1) {
				this.showLabelList = !this.showLabelList
				if (ind != -1) {
					this.searchLabelCurrent = this.searchLabel[ind].name
				}
			},
			setMenu () {
				this.showMenuList = !this.showMenuList
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	$searchArrow: px2em(15);
	$searchColor: red;
	$searchPaddingTop: px2em(20);
	$searchPaddingBottom: $searchPaddingTop;
	$searchMenuWidth: px2em(70); 
	$searchLabelBg: $colorBgWhite;

	.search {
		position: relative;
		display: flex;
		padding: $searchPaddingTop $paddingRight $searchPaddingBottom $paddingLeft;
		background-color: #fff;
		line-height: px2em(50);
		@include font-dpr(14px);
		border-bottom: 1px solid $colorLine;
		margin-bottom: $marginBottom;

		&:before, &:after {
			content: "";
			position: absolute;
			left: $paddingLeft;
			bottom: $searchPaddingBottom;
			width: 1px;
			height: 10px;
			background-color: $searchColor;
		}
		&:after {
			left: auto;
			right: $paddingRight + $searchMenuWidth;
		}
	}

	.search-label {
		position: relative;
		width: px2em(104);
		text-align: center;
		border-bottom: 1px solid $searchColor;
	}
	.search-label-current {
		position: relative;
		color: $searchColor;

		&:before {
			content: '';
			position: absolute;
			bottom: 2px;
			right: 2px;
			width: 0;
	    height: 0;
	    border-bottom: $searchArrow solid $searchColor;
	    border-left: $searchArrow solid transparent;
		}
	}
	.search-label-list {
		position: absolute;
		top: px2em(50);
		width: 100%;
		line-height: 1.75;
		background: $searchLabelBg;
		
		li {
			border: 1px solid $searchColor;
			border-top: 0;
		}
	}

	.search-input	{
		position: relative;
		flex: 1;

		input {
			width: 100%;
			padding: 0 px2em(20);
			border: 0;
			border-bottom: 1px solid $searchColor;
			border-radius: 0;
			line-height: px2em(50);
		}

		.search-btn {
			position: absolute;
			top: px2em(10);
			right: px2em(20);
		}
	}
	.menu {
		width: $searchMenuWidth;
		padding-top: px2em(10);

		.menu-btn {
			float: right;
		}

		.menu-list {
			position: absolute;
			top: px2em(90);
			right: 0;
			width: px2em(200);
			line-height: px2em(80);
			background: $searchLabelBg;
			text-align: center;
	
			li {
				border: 1px solid $colorLine;
				border-right: 0;
				border-top: 0;
			}
		}
	}
</style>