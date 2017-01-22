<!-- 
	tab
 -->

<template>
	<div class="tab">
		<div class="tab-header">
			<p :class="{'current': index == selectedIndex}" v-for="(item, index) in titles" @click="tabSwitch(index)">{{ item }}</p>
		</div>
		<div class="tab-body">
			<slot></slot>
		</div>
	</div>	
</template>

<script type="text/babel">
	export default {
		data () {
			return {
				titles: ['全部', '已付款', '待付款'],
				selectedIndex: 0,
			}
		},
		watch: {
			selectedIndex (val) {
				this.$emit("on-selectedIndex-change", val)
			}
		},
		methods: {
			tabSwitch (index) {
				this.selectedIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	$colorCurrent: #ec5a35;

	.tab {
		width: 100%;
	}

	.tab-header	{
		background-color: $colorBgWhite;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;

		& > p {
			-webkit-box-flex: 1;
		  -moz-box-flex: 1;
		  -webkit-flex: 1;
		  -ms-flex: 1;
		  flex: 1;
			color: $colorTitle;
			@include font-dpr($font);
			line-height: px2em(90);
			text-align: center;
			border-bottom: px2em(2) solid $colorLine;

			&.current {
				color: $colorCurrent;
				border-bottom: px2em(6) solid $colorCurrent;
			}
		}
	}
</style>