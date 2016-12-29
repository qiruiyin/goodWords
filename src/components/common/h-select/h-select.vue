<template>
	<div class="select">
		<label v-if="label">{{ label }}</label>
		<select :name="name" v-model="value">
			<option value="">请选择{{ optionName }}</option>
			<option :value="item.value" v-for="item in options">{{ item.name }}</option>
		</select>
	</div>
</template>

<script type="text/babel">
	export default {
		props: {
			label: String,
			name: String,
			value: String,
			optionName: String,
			options: Array,
		},
		data () {
			return {

			}
		},
		watch: {
			value (val) {
				this.$emit("on-value-change", val)
			},
			options (val) {
				console.log(val)
				// this.value = ''
			}
		},
		methods: {
			setValue (val) {
				this.value = val
			},
			setOptions (val) {
				this.options = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	$selectH: px2em(120);
	$selectLabelW: px2em(200);

	.select	{
		position: relative;
		width: 100%;
		padding: 0 $paddingRight 0 $paddingLeft;
		line-height: $selectH;
		display: flex;
		background-color: $colorBgWhite;
		border-bottom: px2em(2) solid $colorLine;
		@include font-dpr($font);
	}

	label {
		width: $selectLabelW;	
	}

	select {
		flex: 1;
		height: $selectH;
		margin: 0 auto;
		border: 0;
	}
</style>