<template>
	<div class="address-container">
		<tip  :card-data="addressData"  msg="您还未添加地址"></tip>
		<template  v-for="(item, index) in addressData">
			<div @click="onClick(item)">
			<cell-link :cell-link-data="item" ></cell-link>
			</div>
			 <div class="current-address" @click="setDefault(index)"><span :class="item.isDefault? 'icon-check_yuan' : 'icon-uncheck_yuan'"></span>{{item.isDefault? '' : '设置为' }}默认地址</div>
			
		</template>
		
		<div class="btn btn-big btn-submit"   @click="addAddress">新增收货地址</div>

	</div>
</template>

<script type="text/babel">
	import cellLink from 'components/common/cell-link/cell-link.vue'
	import tip from 'components/common/card/tip.vue'

	export default {
		components: {
			cellLink, tip
		},
		data () {
			return {
				addressData: [],
				myAddressListUrl: 'address/addressList',
				setDefaultUrl: 'address/setDefault'
			}
		},
		mounted : function(){
			this.fetchDate();
		},
		methods:{
			fetchDate(){
				var vm = this;
				this.$http.get(this.myAddressListUrl).then(function(response){
					this.addressData = response.data.t;
				   for(var i=0; i<this.addressData.length; i++){
						this.addressData[i].url = '';
					}
				})
			},
			setDefault(index){
				for(var i=0; i<this.addressData.length; i++){
					this.addressData[i].isDefault =false;
				}
				this.addressData[index].isDefault = !this.addressData[index].isDefault;
				this.$http.post(this.setDefaultUrl, {'addressId': this.addressData[index].addressId}).then(function(response){
				})
				// this.$emit('on-click', index)
			},
			onClick (item) {
				this.$emit('on-click', item);
			},
			addAddress(){
				this.$emit('add-address');
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	.current-address {
		padding: px2em(20) $paddingRight 0 $paddingLeft;
		height: px2em(90);
		color: $colorTitleRed;
		background-color: $colorBgWhite;
		@include font-dpr($fontLabel);
		line-height: 1.75;

		span {
			float: left;
			margin-right: px2em(15);
			display: block;
		}
	}
</style>