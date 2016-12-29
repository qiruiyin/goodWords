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

	$inputH: px2em(120);
	$labelW: px2em(200);

	.checkbox {
		position: relative;
		padding: 0 $paddingRight 0 $paddingLeft;
		line-height: $inputH;
		background-color: $colorBgWhite;
		@include font-dpr($font);
		border-bottom: px2em(2) solid $colorLine;
	}

	input {
		float: right;
	}

	.icon {
		position: absolute;
		top: 50%;
		right: $paddingRight;
		width: px2em(120);
		height: px2em(40);
		margin-top: - px2em(20);
		line-height: px2em(40);

		&:before {
			content: '';
			position: absolute;
			right: 0;
			width: px2em(80);
			height: 100%;
			background-color: #ccc;
			border-radius: px2em(20);
		}

		&:after {
			content: "";
			position: absolute;
			top: px2em(2);
			left: px2em(2);
			width: px2em(36);
			height: px2em(36);
			border-radius: px2em(36);
			background-color: #fff;

			transform: translateX(px2em(40));
			transition: .5s;
		}
		
		&.active {
			&:before {
				background-color: #ec5a35;
			}
			
			&:after {
				transform: translateX(px2em(120 - 2*2 - 36));
			}
		}
	}
</style>