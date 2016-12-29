<template>
	<div class="address">
		<cell-link :cell-link-data="addressData"></cell-link>
		<div class="current-address"><span class="icon-check_yuan"></span>默认地址</div>
		
		<router-link class="btn btn-big btn-submit" :to="{name: 'addressAdd'}">新增收货地址</router-link>
	</div>
</template>

<script type="text/babel">
	import cellLink from 'components/common/cell-link/cell-link.vue'

	export default {
		components: {
			cellLink
		},
		data () {
			return {
				addressData: {
					url: 'addressEdit',
					label: '叶良辰',
					name: '13845675678',
					noArrow: true,
					nameColor: 'gray',
					desc: '上海市虹口区广纪路838号B座4楼',
					arrow: false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	.current-address {
		padding: px2em(20) $paddingRight 0 $paddingLeft;
		height: px2em(90);
		color: $colorTitleRed;
		background-color: $colorBgWhite;
		@include font-dpr($fontLabel);
		line-height: 1.75;

		span {
			float: left;
			margin-right: px2em(15);
			display: block;
		}
	}
</style>