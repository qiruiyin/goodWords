<!-- 
	我的订单详情
 -->
<template>
	<div class="my-order-detail">
		<div class="order-heaader">
			<label>订单号：{{ orderData.order.orderNo }}</label>
			<div class="status">{{ orderData.status }}</div>
		</div>

		<div class="order-body">
			<cell-link class="margin-bottom"  :cell-link-data="address" @on-click="changeAddress"></cell-link>

			<imgText :img-text-data="item" v-for="item in cartDatas"></imgText>
			
			<cell-link class="pay margin-bottom" :cell-link-data="orderData.payment"></cell-link>

			<cell-link :cell-link-data="sumsCom"></cell-link>
			<cell-link v-if='hasCoupon' :cell-link-data="coupon" @on-click="changeCoupon"></cell-link>
			<cell-link :cell-link-data="orderData.time" v-if="orderData.status == '已支付'"></cell-link>
			<cell-link :cell-link-data="orderData.paid" v-if="orderData.status == '已支付'"></cell-link>
			
			<div class="footer-btn" v-if="orderData.status != '已支付'">
				<div class="icon" @click="cancelOrder"><div class="icon-trash"></div>删除</div>
				<div class="submit" @click="buy">支付</div>
			</div>
		</div>
		
		<div :class="['coupon', {'active': couponShow}]">		
			<coupon :coupon-data='couponList'  @on-click="chooseCoupon"></coupon>
		</div>

		<div :class="['address', {'active': addressShow}]">
			<h-address  ref="addressCom"  @on-click="chooseAddress"   @add-address="changeAddressAdd"></h-address>
		</div>
		<div  :class="['address', {'active': addressAddShow}]">
			<addrerssAdd @on-click="addAddress"></addrerssAdd>
		</div>
	</div>
</template>

<script type="text/babel">
	import cellLink from 'components/common/cell-link/cell-link.vue'
	import imgText from 'components/common/img-text/img-text.vue'

	import coupon from 'components/common/coupon/coupon.vue'
	import hAddress from 'components/common/address/address.vue'
	import addrerssAdd from 'components/common/address/address-add.vue'

	import img1 from 'assets/img/shop-cart.jpg'

	export default {
		components: {
			cellLink, imgText, coupon, hAddress, addrerssAdd
		},
		data () {
			return {
				/**orderData: {
					number: '123214124',
					status: '待支付',
					userInfo: {
						url: 'address',
						label: '叶良辰', // 左侧名字 
						name: '13845675678', // 右侧信息
						nameColor: 'gray',
						value: '',	// 值
						desc: '上海市虹口区广纪路838号B座4楼', //详情介绍
					},
					gifts: [
						{
							imgPath: img1,
							title: '汉字思维大礼包',
							version: '18分钟版',
							price: '￥2000.00'
						},{
							imgPath: img1,
							title: '汉字思维大礼包',
							version: '18分钟版',
							price: '￥2000.00'
						},{
							imgPath: img1,
							title: '汉字思维大礼包',
							version: '18分钟版',
							price: '￥2000.00'
						}
					],
					payment: {
						label: '支付方式',
						name: '微信支付',
						nameIcon: 'weixin',
					},
					sums: {
						label: '商品总额',
						name: '￥360.00',
						nameColor: 'red',
						noArrow: true
					},
					discount: {
						label: '折扣优惠券',
						name: '满100减30',
						nameColor: 'red',
						noArrow: true
					},
					time: {
						label: '下单时间',
						name: '',
						noArrow: true,
					},
					paid: {
						label: '实付款',
						name: '￥360.00',
						noArrow: true
					}
				},
				**/
				cartDatas: [],
				orderData: {
					order: {},
					payment: {
						label: '支付方式',
						name: '微信支付',
						nameIcon: 'weixin',
						value: '',
						icon: 'weixin'
					},
					discount: {
						label: '折扣优惠券',
						name: '满100减30',
						nameColor: 'red',
						noArrow: true
					},
					sums: {
						label: '商品总额',
						name: '￥360.00',
						nameColor: 'red',
						noArrow: true
					},
					time: {
						label: '下单时间',
						name: '',
						noArrow: true,
					},
					paid: {
						label: '实付款',
						name: '',
						noArrow: true
					},
					leaveMsg: '' //留言
				},
				hasCoupon: true,
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
				cancelOrderUrl: 'order/cancelOrder',
				weixinPayUrl: 'weixinpay/weixinPay',
				payJson: {},
				couponShow: false,
				addressShow: false,
				addressAddShow: false,
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
				
				if (self.addressAddShow || self.couponShow || self.addressShow){
						self.$router.push({name: 'myOrderDetail', params: {'orderId': self.$route.params.orderId }});
						self.couponShow = false
						self.addressShow = false
						self.addressAddShow = false
						return;
				 }
			}, false);
		},
		computed : {
			
			sumsCom : function(){
				var vm = this;
				if(this.coupon.couponType){
					if(vm.coupon.couponType == '01'){
						if(vm.coupon.couponTop){
							var bs = Math.floor(vm.orderData.order.orderMoney / vm.coupon.couponFulfil);
							vm.orderData.sums.name = '￥' +   (vm.orderData.order.orderMoney - Math.min(vm.coupon.couponTop, (vm.coupon.couponReduce * bs)));
						}else{
							vm.orderData.sums.name = '￥' +  (vm.orderData.order.orderMoney - vm.coupon.couponReduce);
						}
						
					}else{
						if(vm.coupon.couponLow){
							if(vm.orderData.order.orderMoney > vm.coupon.couponLow){
								vm.orderData.sums.name = '￥' +  Math.max(0, (vm.orderData.order.orderMoney - vm.coupon.couponInstead));
							}else{
								vm.orderData.sums.name = '￥' +  vm.orderData.order.orderMoney;
							}
							
						}
						
						vm.orderData.sums.name = '￥' +  Math.max(0, (vm.orderData.order.orderMoney - vm.coupon.couponInstead));
						
					}
				}
				return vm.orderData.sums;				
			}
		},
		methods: {
			buy () {
				var vm = this;
				if(vm.address.name == '请选择您的地址' && vm.address.desc == ''){
					layer.open({
						content: '请选择您的地址'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
					  return;
				}
				
				this.$http.post(this.weixinPayUrl, {"orderId" : vm.orderData.order.orderId, 'couponNo' : vm.coupon.couponNo, 'addressId' : vm.address.addressId, 'remark': this.remark}).then(function(response){
					vm.payJson = response.data.t;
					if(response.data == "SUCCESS"){
						 
						layer.open({
							content: '<p>购买成功</p><p>&nbsp;</p><p>您可以在我的课程中查看课程</p>'
							,btn: '我知道了'
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
				this.$http.post(this.buyUrl, {"orderId" : vm.orderData.order.orderId, 'couponNo' : vm.coupon.couponNo}).then(function(response){
					layer.open({
						content: '购买成功，您可以在我的课程中查看课程'
						,btn: '我知道了'
					  });

				   vm.$router.push({name: 'myStory'})
				})
				**/
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
					vm.orderData.order = response.data.t.order;
					vm.orderData.sums.name = "￥" + (vm.orderData.order.orderMoney); 
					vm.orderData.time.name = vm.orderData.order.orderTime;
					vm.couponList = response.data.t.couponList;
					vm.addressList = response.data.t.addressList
					if(vm.addressList.length > 0){
						vm.address = vm.addressList[0];
					}
					vm.address.url = '';
					if(vm.couponList.length > 0){
						if(vm.orderData.order.orderMoney*1 == 0){
								vm.hasCoupon = false;
								vm.coupon = {};
								return;
						}
						//vm.hasCoupon = true;
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
					vm.orderData.paid.name = "￥" + vm.orderData.order.orderPayMoney;
				})
			},
			cancelOrder(){
				var vm = this;
				
				layer.open({
					content: '您确认取消这个订单吗？'
					,btn: ['删除', '再考虑一会']
					,skin: 'footer'
					,yes: function(index){
						layer.close(index);
						vm.$http.post(vm.cancelOrderUrl, {'orderId': vm.orderData.order.orderId}).then(function(response){
						   vm.$router.push({name: 'myOrder'})
						})
					}
				  });
				
			},
			changeCoupon () {
				this.couponShow = !this.couponShow
			},
			chooseCoupon (val) {
				this.changeCoupon()
				if(vm.orderData.order.orderMoney*1 == 0){
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
			changeAddressAdd () {
				this.addressAddShow = !this.addressAddShow;
			},
			changeAddress () {
				this.addressShow = !this.addressShow
			},
			chooseAddress (val) {
				this.changeAddress()
				this.address = val;
				this.address.url = '';
			},
			addAddress(val){
				this.address = val;
				this.addressList.push(val);
				this.addressShow = false;
				this.changeAddressAdd();
				this.$refs.addressCom.fetchDate();
			},
			chooseAddress (val) {
				this.changeAddress()
				this.address = val;
				this.address.url = '';
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

	.my-order-detail {

	}

	.order-heaader {
		padding: 0 $paddingRight 0 $paddingLeft;
		line-height: px2em(80);
		background-color: $colorBgWhite;
		border-bottom: 1px solid $colorLine;

		label {
			border-left: px2em(4) solid #ec5a35;
			padding-left: px2em(15);
		}

		.status {
			float: right;
		}
	}

	.order-body {
		padding-top: $marginBottom;
	}

	.pay {
		margin-top: $marginBottom;
	}

	.footer-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: px2em(110);
		line-height: px2em(110);
		background-color: $colorBgWhite;
		text-align: center;
		display: flex;

		.icon {
			position: relative;
			width: px2em(220);
			color: $colorSubText;
		}

		.submit {
			flex: 1;
			color: $colorWhite;
			background-color: $colorTitleRed;
		}
	}

	.icon-trash {
		position: absolute;
		top: 50%;
		left: px2em(40);
		margin-top: - px2em(17); //取自图片大小
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