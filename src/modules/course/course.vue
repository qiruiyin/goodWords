<template>
	<div>
		<search></search>
		<p>{{ ceshi }}</p>
		<p>adhij法律的考试</p>
		<router-link :to="{name: 'demo'}">demo</router-link>
	</div>
</template>

<script type="text/babel">
	import search from 'components/common/search/search.vue'

	export default {
		components: {
			search
		},
		data () {
			return {
				ceshi: 'wedhsljk'
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>