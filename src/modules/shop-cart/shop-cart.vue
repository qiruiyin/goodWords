<!-- 
	购物车
 -->
<template>
	<div class="shop-cart">
		<tip  :card-data="cartDatas"  msg="您的购物车是空的"></tip> 
		<imgText v-if="item.show" :ref="'imgText'+index" :img-text-data="item" v-for="(item, index) in cartDatas" @on-check="onCheck">
		</imgText>
		<div class="btns">
			<div class="select-all" @click="selectAll">
				<div :class="['checkbox', checkAll ? 'icon-check_yuan': 'icon-uncheck_yuan']"></div>
				全选
			</div>
			<div class="delete" @click="delShopcart">删除</div>
			<div class="next" @click="next">下一步</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import imgText from 'components/common/img-text/img-text.vue'
	import img1 from 'assets/img/shop-cart.jpg'
	import tip from 'components/common/card/tip.vue'

	export default {
		components: {
			imgText, tip
		},
		data () {
			return {
				/**cartDatas: [
					{
						imgPath: img1,
						title: '汉字思维大礼包',
						version: '18分钟版',
						price: '￥2000.00',
						num: 5,
						hasCheck: true,
						check: true
					},{
						imgPath: img1,
						title: '汉字思维大礼包',
						version: '18分钟版',
						price: '￥2000.00',
						num: 5,
						hasCheck: true,
						check: false
					},{
						imgPath: img1,
						title: '汉字思维大礼包',
						version: '18分钟版',
						price: '￥2000.00',
						num: 5,
						hasCheck: true,
						check: false
					}
				],
				**/
				shopcartListUrl : "shopcart/shopcartList",
				shopcartDelUrl : "shopcart/delShopcart",
				shopcartNextUrl : "order/addOrder",
				cartDatas : [],
				checkAll: true
			}
		},
		created: function(){
			var vm = this;
			vm.fetchData();
			
		},
		methods: {
			next () {
				var vm = this;
				var shopcartIds = ""
				var hasChecked = false;
				for(var i=0; i<this.cartDatas.length; i++){	
					if( this.cartDatas[i].check){
						hasChecked = true;
						if(shopcartIds){
							shopcartIds = shopcartIds + "-" + this.cartDatas[i].shopcartId;
						}else{
							shopcartIds = this.cartDatas[i].shopcartId;
						}
					}	
				}
				if(hasChecked){
					vm.$http.post(vm.shopcartNextUrl, { "shopcartIds" : shopcartIds}).then((response) => {
						vm.$router.push({name: 'confirmOrder', params: {'orderId': response.data.t}});
					})
				
				}else{
					layer.open({
					content: '请您先选购商品'
					,skin: 'msg'
					,time: 2 //2秒后自动关闭
				  });
				}

				
			},
			selectAll () {
				var vm = this;
				this.checkAll = !this.checkAll
				
				 this.cartDatas.every(function(elem) {
					return elem.check = vm.checkAll
				})
			},
			onCheck (val) {
				let data
				if (val) {
					data = this.cartDatas.every(function(elem) {
						return elem.check == true
					})
					if (data) this.checkAll = true
				} else {
					this.checkAll = false
				}
			},
			delChecked(){
				var vm = this;
				for(var i=0; i<this.cartDatas.length; i++){	
					if( this.cartDatas[i].check){
						vm.cartDatas[i].show = false;
						vm.$http.post(vm.shopcartDelUrl, { "shopcartId" : this.cartDatas[i].shopcartId}).then((response) => {
							
						})
					}	
				}
				
			},
			fetchData(){
				var vm = this;
				this.$http.get(this.shopcartListUrl).then((response)=>{
					vm.cartDatas = response.data.t;
					
				})
			},
			delShopcart () {
				var vm = this;
				layer.open({
				content: '您确认要从购物车中删除这些商品？'
				,btn: ['删除', '取消']
				,skin: 'footer'
				,yes: function(index){
					layer.close(index);
					vm.delChecked();
				}
			  });
			}
		},
		computed : {
			totalMoney : function(){
				var vm = this;
				var total = 0;
				for(var i=0; i<this.cartDatas.length; i++){	
					if( this.cartDatas[i].check && this.cartDatas[i].price != "免费"){
						total += (this.cartDatas[i].priceNum * 1)
					}	
				}	
				return total;
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
		z-index: 9;

		.delete {
			flex: 1;
			color: $colorTitleRed;
		}

		.next {
			width: px2em(300);
			color: $colorWhite;
			background-color: $colorTitleRed;
		}
	}

	.select-all {
		width: px2em(200);

		.checkbox {
			position: absolute;
			top: 50%;
			left: px2em(20);
			margin-top: - px2em(18);
		}
	}
	
	.no-result{
	    padding-top: 40px;
		text-align: center;
	}
</style>