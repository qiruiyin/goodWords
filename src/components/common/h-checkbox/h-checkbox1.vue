<template>
	<div class="checkbox" @click="setValue">
		<label for="">{{ label }}</label>
		<div :class="['icon', {'active': value}]" :data-value="value">{{ value ? '是': '否' }}</div>
	</div>
</template>

<script type="text/babel">
	export default {
		props: {
			label: String,
			value: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {

			}
		},
		methods: {
			setValue (val) {
				this.value = !this.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

</style>