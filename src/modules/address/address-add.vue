<template>
	<div class="address-add">
		<h-input :label="consignee.label" :placeholder="consignee.placeholder" :icon="consignee.icon"></h-input>
		<h-input :type="tel.type" :label="tel.label" :placeholder="tel.placeholder" :icon="tel.icon" :value="tel.value"></h-input>
		
		<h-input :type="postcode.type" :label="postcode.label" :placeholder="postcode.placeholder" :icon="postcode.icon"></h-input>
		
		<div class="select">
			<label>省份</label>
			<select v-model="provinceValue">
				<option value="">请选择省份</option>
				<option :value="item.value" v-for="item in province">{{ item.name }}</option>
			</select>
		</div>
		
		<div class="select">
			<label>城市</label>
			<select v-model="cityValue">
				<option value="">请选择城市</option>
				<option :value="item.value" v-for="item in city">{{ item.name }}</option>
			</select>
		</div>
		
		<div class="select">
			<label>区县</label>
			<select v-model="countyValue">
				<option value="">请选择区县</option>
				<option :value="item.value" v-for="item in county">{{ item.name }}</option>
			</select>
		</div>

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
					placeholder: '请输入收货人',
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
				city: [],
				county: [],
				provinceValue: '',
				cityValue: '',
				countyValue: ''
			}
		},
		watch: {
			provinceValue (val) {
				if (this.province.length == 0) {
					this.city = []
				} else {
					let data = this.province.filter(function(elem) {
						return elem.value == val;
					})
					this.city = data.length == 0 ? [] : data[0].citys	
				}
				this.cityValue = ''
			},
			cityValue (val) {
				if (this.city.length == 0) {
					this.county = []
				} else {
					let data = this.city.filter(function(elem) {
						return elem.value == val;
					})
					this.county = data.length == 0 ? [] : data[0].countys	
				}
				this.countyValue = ''
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

		label {
			width: $selectLabelW - $paddingLeft;	
		}

		select {
			flex: 1;
			height: $selectH;
			margin: 0 auto;
			border: 0;
		}
	}

	
</style>