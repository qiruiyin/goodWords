<template>
	<div class="address-add">
		<h-input :label="consignee.label" :placeholder="consignee.placeholder" :icon="consignee.icon"></h-input>
		<h-input :type="tel.type" :label="tel.label" :placeholder="tel.placeholder" :icon="tel.icon" :value="tel.value"></h-input>
		<h-input :type="postcode.type" :label="postcode.label" :placeholder="postcode.placeholder" :icon="postcode.icon"></h-input>
		
		<!-- <h-select ref="province" v-model="provinceValue" :label="'省份'" :options="province" @on-value-change="provinceChange"></h-select>
		<h-select ref="city" v-model="cityValue" :label="'城市'" :options="city" @on-value-change="cityChange"></h-select>
		<h-select ref="county" v-model="countyValue" :label="'区县'" :options="county"></h-select> -->

		<h-input :label="address.label" :placeholder="address.placeholder" :icon="address.icon"></h-input>
	</div>
</template>

<script type="text/babel">
	import hInput from 'components/common/h-input/h-input.vue'
	import hSelect from 'components/common/h-select/h-select.vue'

	export default {
		components: {
			hInput, hSelect
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
				province: [
					{
						name: '上海',
						value: 'shanghai',
						citys: [
							{
								name: '上海',
								value: 'shanghai',
								countys: [
									{
										name: '嘉定区',
										value: 'jiading'
									},{
										name: '徐家汇',
										value: 'xujiahui'
									}
								]
							}
						]
					},{
						name: '北京',
						value: 'beijing',
						citys: [
							{
								name: '北京',
								value: 'beijing',
								countys: [
									{
										name: '北城',
										value: 'beicheng'
									},{
										name: '房山',
										value: 'fangshan'
									}
								]
							}
						]
					},{
						name: '山东',
						value: 'shandong',
						citys: [
							{
								name: '菏泽',
								value: 'heze',
								countys: [
									{
										name: '定陶',
										value: 'dingtao'
									},{
										name: '单县',
										value: 'shanxian'
									}
								]
							}
						]
					}
				],
				provinceValue: 'shanghai',
				city: [],
				cityValue: '',
				county: [],
				countyValue: '',
			}
		},
		computed: {
		},
		methods: {
			// provinceChange (val) {
			// 	let data = this.province.filter(elem => {
			// 		return elem.value == val
			// 	})
			// 	this.$refs.city.setOptions(data[0].citys)
			// 	this.$refs.province.setValue(val)
			// 	console.log(this.provinceValue, this.cityValue, this.countyValue)
			// },
			// cityChange (val) {
			// 	console.log('city', this.city)
			// 	// let data = this.city.filter(elem => {
			// 	// 	return elem.value == val
			// 	// })
			// 	console.log(data)
			// 	this.$refs.county.setOptions(data[0].countys)
			// 	this.$refs.city.setOptions(val)
			// 	console.log(this.provinceValue, this.cityValue, this.countyValue)
			// }
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
</style>