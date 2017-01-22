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
			<input type="text" v-model="searchWord" :placeholder="input.placeholder" @keyup.enter="search()">
			<div class="search-btn icon-search_icon" @click="search()"></div>
		</div>
		<div class="menu">
			<div class="menu-btn icon-book" @click="setMenu()"></div>
			<ul v-show="showMenuList" class="menu-list">
				<li v-for="item in menuList" @click="search(item)" :class="{active: item.storyId == currentStory}">
					{{ item.storyName }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		props: ['searchWordCurrent', 'searchTypeCurrent', 'currentStory', 'myCourse'],
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
				searchType : {
						name: '汉字',
						value: 'chinese'},
				input: {
					placeholder: '请输入搜索的汉字或课程名',
					value: ''
				},
				menuList: [],
				searchWord : '',
				showMenuList: false,
				storyListUrl: 'course/allStoryList'
			}
		},
		mounted: function(){
			var vm = this;
			this.$http.get(this.storyListUrl).then(function(response){
				vm.menuList = response.data.t;
			})
			
			for(var i=0; i<this.searchLabel.length; i++){
				if(this.searchTypeCurrent == this.searchLabel[i].value){
					this.searchLabelCurrent = this.searchLabel[i].name
					this.searchType = this.searchLabel[i];
				}
			}
			this.searchWord = this.searchWordCurrent;
		},
		methods: {
			setSearchLabel (ind = -1) {
				this.showLabelList = !this.showLabelList
				if (ind != -1) {
					this.searchLabelCurrent = this.searchLabel[ind].name
					this.searchType = this.searchLabel[ind];
				}
			},
			setMenu (e) {
				document.body.className = 'no-scroll'
				this.showMenuList = !this.showMenuList

			},
			search(story){
				if(!this.searchWord){
					layer.open({
						content: '请您输入搜索的汉字或课程名'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
					return;
				}
				var storyId = "all";
				if(story){
					storyId = story.storyId
				}
				this.$router.push({name: 'courseSearch', params: {'storyId': storyId, 'searchType': this.searchType.value, 'searchWord': this.searchWord, 'myCourse': this.myCourse}});
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
			// content: "";
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
		left: - $paddingLeft;
		width: px2em(200);
		line-height: px2em(80);
		background: $searchLabelBg;
		z-index: 9;

		li {
			border: 1px solid $colorLine;
			border-right: 0;
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
			z-index: 9;
			height: px2em(640);
			overflow:auto;
			-webkit-overflow-scrolling: touch;
			li {
				border: 1px solid $colorLine;
				border-right: 0;
				border-top: 0;
			}
		}
	}
	.active{
		color: red;
	}
</style>