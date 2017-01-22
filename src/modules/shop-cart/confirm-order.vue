<!--
	确定下单 
 -->
<template>
	<div>
		<div class="confirm-order">
			<imgText :img-text-data="item" v-for="(item, index) in cartDatas"></imgText>
			<cellLink v-if='hasCoupon'  class="cell-link-bottom" :cell-link-data="coupon" @on-click="changeCoupon"></cellLink>

			<div class="msg">
				<label>留言</label>
				<input type="text" v-model="remark" placeholder="请输入留言">
			</div>

			<cellLink class="cell-link-bottom" :cell-link-data="address" @on-click="changeAddress"></cellLink>
			<cellLink class="cell-link-bottom" :cell-link-data="orderDatas.payment"></cellLink>
			
			<div class="leave-word">
				<label for=""></label>
			</div>

			<div class="btns">
				<label>合计：<span>￥{{totalMoney}}</span></label>
				<div class="next" @click="next">下一步</div>
			</div>	
		</div>
		
		<div :class="['coupon', {'active': couponShow}]">		
			<coupon @on-click="chooseCoupon" :coupon-data='couponList'></coupon>
		</div>

		<div :class="['address', {'active': addressShow}]">
			<h-address ref="addressCom" @on-click="chooseAddress" @add-address="changeAddressAdd"></h-address>
		</div>
		<div  :class="['address', {'active': addressAddShow}]">
			<addrerssAdd @on-click="addAddress"></addrerssAdd>
		</div>
	</div>
</template>

<script type="text/babel">
	import imgText from 'components/common/img-text/img-text.vue'
	import cellLink from 'components/common/cell-link/cell-link.vue'

	import coupon from 'components/common/coupon/coupon.vue'
	import hAddress from 'components/common/address/address.vue'
	import addrerssAdd from 'components/common/address/address-add.vue'

	import img1 from 'assets/img/shop-cart.jpg'

	export default {
		components: {
			imgText, cellLink, coupon, hAddress, addrerssAdd
		},
		data () {
			return {
				
				cartDatas: [],
				orderDatas: {
					order: {},
					payment: {
						label: '支付方式',
						name: '微信支付',
						nameIcon: 'weixin',
						value: '',
						icon: 'weixin'
					},
					leaveMsg: '' //留言
				},
				coupon : {
					url: '',  
					params: '', 
					label: '优惠券',  
					name: '没有可用的优惠券', 
				 	value: '',	
				 	desc: ''
				},
				address: {
					url: '',  
					params: '', 
					label: '地址',  
					name: '请选择您的地址', 
				 	value: '',	
				 	desc: ''
				},
				couponList : [],
				addressList : [],
				orderInfoUrl : "order/orderInfo",
				buyUrl : 'order/buy',
				weixinPayUrl: 'weixinpay/weixinPay',
				couponShow: false,
				addressShow: false,
				addressAddShow: false,
				payJson: {},
				hasCoupon: true,
				remark: ''
			}
		},
		created: function(){
			var vm = this;
			vm.fetchData();
			
		},
		mounted: function(){
			let self = this;
			window.addEventListener("popstate", function(e) {
				if(self.addressAddShow || self.couponShow || self.addressShow){
					self.$router.push({name: 'confirmOrder', params: {'orderId': self.$route.params.orderId }});
					self.couponShow = false;
					self.addressAddShow = false;
					self.addressShow = false;
				}
			}, false);
		},
		methods: {
			next (){
				var vm = this;
				if(vm.address.name == '请选择您的地址' && vm.address.desc == ''){
					layer.open({
						content: '请选择您的地址'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
					  return;
				}
				this.$http.post(this.weixinPayUrl, {"orderId" : vm.orderDatas.order.orderId, 'couponNo' : vm.coupon.couponNo, 'addressId' : vm.address.addressId, 'remark': this.remark}).then(function(response){
					vm.payJson = response.data.t;
					if(response.data == "SUCCESS"){
						 
						layer.open({
							content: "<p>购买成功</p><p>&nbsp;</p><p>您可以在我的课程中查看课程</p>"
							,btn: "我知道了"
						  });

						vm.$router.push({name: 'myStory'})
						return;
					}
					if (typeof WeixinJSBridge == "undefined") {
							if (document.addEventListener) {
								document.addEventListener('WeixinJSBridgeReady',
										vm.onBridgeReady, false);
							} else if (document.attachEvent) {
								document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady);
								document
										.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady);
							}
						} else {
							vm.onBridgeReady();
						}
						
				})
				
				/**
				var vm = this;
				this.$http.post(this.buyUrl, {"orderId" : vm.orderDatas.order.orderId, 'couponNo' : vm.coupon.couponNo}).then(function(response){
					layer.open({
						content: '购买成功，您可以在我的课程中查看课程'
						,btn: '我知道了'
					  });

				   vm.$router.push({name: 'myStory'})
				})
				**/
				// this.$router.push({name: ''})
			},
			onBridgeReady(){
				var vm = this;
				WeixinJSBridge.invoke('getBrandWCPayRequest', vm.payJson, function(res) {		 
				
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						layer.open({
							content: '<p>购买成功</p><p>&nbsp;</p><p>您可以在我的课程中查看课程</p>'
							,btn: '我知道了'
						  });

						vm.$router.push({name: 'myStory'})
						
					 
					}else{
						//alert(res.err_msg)
					}
				})
			},
			fetchData(){
				
				this.orderId = this.$route.params.orderId;
				var vm = this;
				this.$http.get(this.orderInfoUrl, {params:{"orderId" : this.orderId}}).then((response)=>{
					vm.cartDatas = response.data.t.orderDetailList;
					vm.orderDatas.order = response.data.t.order;
					vm.couponList = response.data.t.couponList;
					vm.addressList = response.data.t.addressList
					if(vm.addressList.length > 0){
						vm.address = vm.addressList[0];
					}
					vm.address.url = '';
					if(vm.couponList.length > 0){
						if(vm.orderDatas.order.orderMoney*1 == 0){
								vm.hasCoupon = false;
								vm.coupon = {};
								return;
						}
						
						vm.coupon = vm.couponList[0];
						//vm.coupon.label = vm.coupon.couponMemo;
						vm.coupon.label = "优惠券"
						if(vm.coupon.couponType == '01'){
							if(vm.coupon.couponTop){
								vm.coupon.name =  '每满' + vm.coupon.couponFulfil + '元减' +vm.coupon.couponReduce + '元，最高限额' + vm.coupon.couponTop + '元';
							}else{
								vm.coupon.name =  '满' + vm.coupon.couponFulfil + '元减' +vm.coupon.couponReduce + '元';
							}	
						}else{
							if(vm.coupon.couponLow){
								vm.coupon.name =  '抵扣' + vm.coupon.couponInstead + '元，最低消费' +vm.coupon.couponLow + '元可用';
							}else{
								vm.coupon.name =  '抵扣' + vm.coupon.couponInstead + '元';
							}
							
						}
					}
				})
			},
			changeCoupon () {
				this.couponShow = !this.couponShow
			},
			chooseCoupon (val) {
				var vm = this;
				this.changeCoupon()
				if(vm.orderDatas.order.orderMoney*1 == 0){
					vm.hasCoupon = false;
					vm.coupon = {};
					return;
				}
				this.coupon = val; 
				//this.coupon.label = this.coupon.couponMemo + ' ' + this.coupon.couponNo;
				this.coupon.label = "优惠券"
				if(vm.coupon.couponType == '01'){
					if(vm.coupon.couponTop){
						vm.coupon.name =  '每满' + vm.coupon.couponFulfil + '元减' +vm.coupon.couponReduce + '元，最高限额' + vm.coupon.couponTop + '元';
					}else{
						vm.coupon.name =  '满' + vm.coupon.couponFulfil + '元减' +vm.coupon.couponReduce + '元';
					}	
				}else{
					if(vm.coupon.couponLow){
						vm.coupon.name =  '抵扣' + vm.coupon.couponInstead + '元，最低消费' +vm.coupon.couponLow + '元可用';
					}else{
						vm.coupon.name =  '抵扣' + vm.coupon.couponInstead + '元';
					}
					
				}
			},
			changeAddress () {
				
				this.addressShow = !this.addressShow
			},
			changeAddressAdd () {
				
				this.addressAddShow = !this.addressAddShow;
			},
			addAddress(val){
				this.address = val;
				this.addressList.push(val);
				this.$refs.addressCom.fetchDate();
				this.addressShow = false;
				this.changeAddressAdd();
			},
			chooseAddress (val) {
				this.changeAddress()
				this.address = val;
				this.address.url = '';
			}
		},
		computed : {
			totalMoney : function(){
				var vm = this;
				if(this.coupon.couponType){
					if(vm.coupon.couponType == '01'){
						if(vm.coupon.couponTop){
							var bs = Math.floor(vm.orderDatas.order.orderMoney / vm.coupon.couponFulfil);
							return (vm.orderDatas.order.orderMoney - Math.min(vm.coupon.couponTop, (vm.coupon.couponReduce * bs)));
						}else{
							return (vm.orderDatas.order.orderMoney - vm.coupon.couponReduce);
						}
						
					}else{
						if(vm.coupon.couponLow){
							if(vm.orderDatas.order.orderMoney > vm.coupon.couponLow){
								return Math.max(0, (vm.orderDatas.order.orderMoney - vm.coupon.couponInstead));
							}else{
								return vm.orderDatas.order.orderMoney;
							}
							
						}
						
						return Math.max(0, (vm.orderDatas.order.orderMoney - vm.coupon.couponInstead));
						
					}
				}
				return vm.orderDatas.order.orderMoney;				
			}
		},
		watch:{
			  '$route':'fetchData'
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	$msgPadding: px2em(30);

	.msg {
		padding: $msgPadding $paddingRight $msgPadding $paddingLeft;
		background-color: $colorBgWhite;
		display: flex;
    border-top: 1px solid $colorLine;
    border-bottom: 1px solid $colorLine;
    margin-bottom: $marginBottom;

		label {
			width: px2em(100);
		}

		input {
			flex: 1;
			border: 0;
		}
	}

	.btns {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: px2em(110);
		line-height: px2em(110);
		background-color: $colorBgWhite;
		@include font-dpr($font);
		color: $colorArticle;
		border-top: 2px solid $colorLine;
		display: flex;
		text-align: center;

		label {
			flex: 1;
			color: $colorTitleBlack;
			text-align: left;
			text-indent: $paddingLeft;
			display: block;

			span {
				color: $colorTitleRed;
			}
		}

		.next {
			width: px2em(300);
			color: $colorWhite;
			background-color: $colorTitleRed;
		}
	}

	.coupon, .address {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: $colorBg;
		transform: translateX(100%);
		transition: 1s;

		&.active {
			transform: translateX(0);
		}
	}
</style>