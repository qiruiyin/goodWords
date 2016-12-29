<template>
	<div class="address-add">
		<h-input :label="consignee.label" :placeholder="consignee.placeholder" :icon="consignee.icon"></h-input>
		<h-input :type="tel.type" :label="tel.label" :placeholder="tel.placeholder" :icon="tel.icon" :value="tel.value"></h-input>
		<h-input :type="postcode.type" :label="postcode.label" :placeholder="postcode.placeholder" :icon="postcode.icon"></h-input>
		<h-input :label="address.label" :placeholder="address.placeholder" :icon="address.icon"></h-input>
		<h-checkbox :label="def.label" :value="def.value"></h-checkbox>
	
		<div class="btn btn-big btn-submit">保存</div>
		<router-link :to="{name: 'address'}" class="btn btn-big">取消</router-link>
	</div>
</template>

<script type="text/babel">
	import hInput from 'components/common/h-input/h-input.vue'
	import hCheckbox from 'components/common/h-checkbox/h-checkbox.vue'

	export default {
		components: {
			hInput, hCheckbox
		},
		data () {
			return {
				consignee: {
					label: '收货人',
					placeholder: '小胡子叔叔',
					icon: 'delete'
				},
				tel: {
					label: '手机号码',
					placeholder: '请输入电话号码',
					type: 'number',
					value: '18657403241',
					icon: 'delete'
				},
				postcode: {
					label: '邮政编码',
					placeholder: '请输入邮政编码',
					type: 'number',
					icon: 'delete'
				},
				address: {
					label: '详细地址',
					placeholder: '请输入详细地址',
					icon: 'delete'
				},
				def: {
					label: '是否设为默认',
					value: true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
</style>