<template>
	<div class="input" :class="wrapClasses">
		<label v-if="label">{{ label }}</label>
		<template v-if="type == 'password'">
			<input 
				type="password"
				:class="[inputClasses, {'input-icon': icon}]"
				:placeholder="placeholder"
				:disabled="disabled"
				:maxlength="maxlength"
				:readonly="readonly"
				:name="name"
				v-model="currentValue"
				>	
		</template>
		<template v-if="type == 'number'">
			<input 
				type="number"
				:class="[inputClasses, {'input-icon': icon}]"
				:placeholder="placeholder"
				:disabled="disabled"
				:maxlength="maxlength"
				:readonly="readonly"
				:name="name"
				v-model="currentValue"
				>	
		</template>
		<template v-else>
			<input 
				type="text"
				:class="[inputClasses, {'input-icon': icon}]"
				:placeholder="placeholder"
				:disabled="disabled"
				:maxlength="maxlength"
				:readonly="readonly"
				:name="name"
				v-model="currentValue"
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
			value: ''
		},
		data () {
			return {
				currentValue : this.value
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
				this.currentValue = '';
			},
			setValue(value){
				this.currentValue = value;
			}
		},
		watch: {
			currentValue (val) {
				this.$emit("setInputValue", val);
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
		height: $inputH;
		@include font-dpr($font);
		color: $colorTitleBlack;
		background-color: $colorBgWhite;
	}

	label {
		position: absolute;
		top: 0;
		left: 0;
		width: $labelW;
		line-height: $inputH;
		text-align: left;
		text-indent: $paddingLeft;
	}

	input {
		width: 100%;
		padding: px2em(40) 0;
		padding-right: $paddingRight;
		padding-left: $labelW;
		// line-height: $inputH;
		border: 0;
		border-bottom: px2em(2) solid $colorLine;

		&.input-icon {
			padding-right: $paddingRight + px2em(50);
		}
	}
	
	.icon {
		position: absolute;
		top: 50%;
		right: $paddingRight;
		margin-top: - px2em(17);
	}

</style>