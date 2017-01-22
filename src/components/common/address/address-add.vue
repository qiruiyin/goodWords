<template>
	<div class="address-add">
		<h-input :label="consignee.label" @setInputValue="setConsignee" :placeholder="consignee.placeholder" :icon="consignee.icon"></h-input>
		<h-input :type="tel.type" :label="tel.label"  @setInputValue="setTel" :placeholder="tel.placeholder" :icon="tel.icon" :value="tel.value"></h-input>
		
		<h-input :type="postcode.type" :label="postcode.label" @setInputValue="setPostcode" :placeholder="postcode.placeholder" :icon="postcode.icon"></h-input>
		
		<div class="select">
			<label>省份</label>
			<select v-model="provinceValue">
				<option value="">请选择省份</option>
				<option :value="index" v-for="(item, index)  in province">{{ item.name }}</option>
			</select>
		</div>
		
		<div class="select">
			<label>城市</label>
			<select v-model="cityValue">
				<option value="">请选择城市</option>
				<option :value="index" v-for="(item, index)  in cityList">{{ item.name }}</option>
			</select>
		</div>
		
		<div class="select">
			<label>区县</label>
			<select v-model="countyValue">
				<option value="">请选择区县</option>
				<option :value="index" v-for="(item, index)  in countyList">{{ item.name }}</option>
			</select>
		</div>

		<h-input :label="address.label"  @setInputValue="setAddress"  :placeholder="address.placeholder" :icon="address.icon"></h-input>
		<h-checkbox :label="def.label"  @setInputValue="setDef" :value="def.value"></h-checkbox>
		
		
		

		<div class="btn btn-big btn-submit" @click="addAddress">保存</div>
	</div>
</template>

<script type="text/babel">
	import hInput from 'components/common/h-input/h-input.vue'
	import hCheckbox from 'components/common/h-checkbox/h-checkbox.vue'
	import {province, city, area} from './city-data.js';

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
					value: '',
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
				province: [],
				city: [],
				county: [],
				provinceValue: '',
				cityValue: '',
				countyValue: '',
				addressInfo : {
					"isDefault" : true
				},
				provinceState: {},
				cityState: {},
				areaState: {},
				addressAddUrl : 'address/createAddress',
			}
		},
		mounted: function() {
			this.init();
		},
		methods: {
			init(){
				this.province = province;
				this.city = city; 
				this.county = area;     
			},
			addAddress(){
				
				if(!this.addressInfo.consignee){
					layer.open({
						content: '请输入收货人'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
  
					return false;
				}

				if(!this.addressInfo.mobile){
					layer.open({
						content: '请输入手机号'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
  
					return false;
				}
				
				if(!this.inputMobile(this.addressInfo.mobile)){
					layer.open({
						content: '请输入正确的手机号'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
  
					return false;
				}

				if(!this.provinceState.name){
					layer.open({
						content: '请选择省份'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
  
					return false;
				}

				if(!this.cityState.name){
					layer.open({
						content: '请选择城市'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
  
					return false;
				}

				if(!this.addressInfo.addressDetail){
					layer.open({
						content: '请输入详细地址'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
  
					return false;
				}
 
				var vm = this;
				vm.addressInfo.provinceIndex = vm.provinceValue;
				vm.addressInfo.province = vm.provinceState.name;
				vm.addressInfo.cityIndex = vm.cityValue;
				
				if(!vm.cityState.name){
					vm.cityState =  this.city[0]
				}
				vm.addressInfo.city = vm.cityState.name;
				vm.addressInfo.areaIndex = vm.countyValue;
				if(!vm.areaState.name){
					vm.areaState =  this.countyList[0]
				}
				if(vm.areaState){
					vm.addressInfo.area = vm.areaState.name;
				}else{
					vm.addressInfo.area = '';
				}
				
				vm.$http.post(vm.addressAddUrl, vm.addressInfo)
				.then((response) => {
					this.$emit('on-click', response.data.t);
				})
			},
			setConsignee(value){
				this.consignee.value = value;
				this.addressInfo.consignee = value;
			},
			setTel(value){
								
				this.tel.value = value;
				this.addressInfo.mobile = value;
			},
			setPostcode(value){
				this.postcode.value = value;
				this.addressInfo.postcode = value;
			},
			setAddress(value){
				this.address.value = value;
				this.addressInfo.addressDetail = value;
			},
			setDef(value){
				this.def.value = value;
				this.addressInfo.isDefault = value;
			},
			inputMobile(num) {
				var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(14[1-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				if(reg.test(num)){
					return true;
				}else{
					reg = /^((5|6|9)\d{7})$/;
					return reg.test(num);
				}
			}
        },
		computed: {
			cityList: function(){	
				var vm = this;
				return vm.city.filter(function(elem) {
					return elem.parentId == vm.provinceState.code;
				})
			
			},
			countyList: function(){
				var vm = this;
				return vm.county.filter(function(elem) {
					return elem.parentId == vm.cityState.code;
				})
			
			}
		},
		watch: {
			provinceValue (val) {
				if(this.province[val]){
					this.provinceState = this.province[val];
				}else{
					this.provinceState = {};
				}
						
			},
			cityValue (val) {
				if(this.cityList[val]){
					this.cityState = this.cityList[val];
				}else{					
					this.cityState = {};
				}	
			
				
			},
			countyValue(val){
				if(this.countyList[val]){
					this.areaState = this.countyList[val];
				}else{
					this.areaState = {};
				}
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