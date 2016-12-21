<template>
	<div>
		<p>{{ ceshi }}</p>
		<router-link :to="{ name: 'course' }">About</router-link>
	</div>
</template>

<script type="text/babel">
	export default {
		data () {
			return {
				ceshi: 'wedhsljk'
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>