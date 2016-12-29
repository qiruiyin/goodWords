<template>
	<div class="input" :class="wrapClasses">
		<label v-if="label">{{ label }}</label>
		<template v-if="type == 'password'">
			<input 
				type="password"
				:class="inputClasses"
				:placeholder="placeholder"
				:disabled="disabled"
				:maxlength="maxlength"
				:readonly="readonly"
				:name="name"
				v-model="value"
				>	
		</template>
		<template v-if="type == 'number'">
			<input 
				type="number"
				:class="inputClasses"
				:placeholder="placeholder"
				:disabled="disabled"
				:maxlength="maxlength"
				:readonly="readonly"
				:name="name"
				v-model="value"
				>	
		</template>
		<template v-else>
			<input 
				type="text"
				:class="inputClasses"
				:placeholder="placeholder"
				:disabled="disabled"
				:maxlength="maxlength"
				:readonly="readonly"
				:name="name"
				v-model="value"
				>	
		</template>
		<div :class="['icon', 'icon-'+icon]" v-if="icon" @click="deleteInput"></div>
	</div>
</template>

<script type="text/babel">
	export default {
		props: {
			wrapClasses: String,
			label: String,
			icon: {
				type: String,
				default: 'delete'
			},
			type: {
				type: String,
			},
			inputClasses: String,
			placeholder: String,
			disabled: {
				type: Boolean,
				default: false
			},
			readonly: {
				type: Boolean,
				default: false
			},
			maxlength: Number,
			name: String,
			value: { //这个问题暂时没有理清楚，现在这样做也可以，只是会有vue警告，不符合vue2的思想
				type: [String, Number],
        default: ''
			}
		},
		data () {
			return {
				
			}
		},
		// computed: {
		// 	computedValue: {
		// 		get () {
		// 			return this.value
		// 		},
		// 		set () {
		// 			// console.log(this.computedValue)
		// 			this.value = this.computedValue
		// 		}
		// 	}
		// },
		methods: {
			deleteInput () {
				this.value = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	$inputH: px2em(120);
	$labelW: px2em(200);

	.input {
		position: relative;
		width: 100%;
		line-height: $inputH;
		@include font-dpr($font);
		color: $colorTitleBlack;
	}

	label {
		position: absolute;
		top: 0;
		left: 0;
		width: $labelW;
		text-align: left;
		text-indent: $paddingLeft;
	}

	input {
		width: 100%;
		padding-left: $labelW;
		line-height: $inputH;
		border: 0;
		border-bottom: px2em(2) solid $colorLine;
	}
	
	.icon {
		position: absolute;
		top: 50%;
		right: $paddingRight;
		margin-top: - px2em(17);
	}

</style>