<template>
	<div class="address">
		<cell-link :cell-link-data="addressData"></cell-link>

		<router-link class="btn btn-big btn-submit" :to="{name: 'addressAdd'}">新增</router-link>
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
					label: '叶良辰',
					name: '13845675678',
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
	
	
</style>