<!-- 
	用户中心
 -->
 
<template>
	<div class="user-center">
		<div class="user-center-header">
			<img :src="userInfo.imgPath" alt="用户头像">
			<p>{{ userInfo.name }}</p>
		</div>

		<div class="user-center-body">
			<cellLink :cell-link-data="item" v-for="item in userInfo.msgs"></cellLink>
		</div>
	</div>
</template>

<script type="text/babel">
  import cellLink from 'components/common/cell-link/cell-link.vue'

  import headerImg from 'assets/img/user-header.jpg'

	export default {
		components: {
			cellLink
		},
		data () {
			return {
				userInfo: {
					imgPath: '',
					name: '西斯克里夫',
					msgs: [
						{
							url: 'myOrder',
							label: '我的订单',
							labelIcon: 'order',
							value: ''
						},{
							url: 'coupon',
							label: '优惠券管理',
							labelIcon: 'youhuiquan',
							value: ''
						},{
							url: 'address',
							label: '地址管理',
							labelIcon: 'dizhi',
							value: ''
						},{
							url: 'myStore',
							label: '我的收藏',
							labelIcon: 'wodeshoucang',
							value: ''
						},{
							url: 'myConsult',
							label: '我的咨询',
							labelIcon: 'wodezixun',
							value: ''
						}
					]
				},
				userInfoUrl: 'usercenter/userInfo'
			}
		},
		mounted : function(){
			var vm = this;
			this.$http.get(this.userInfoUrl).then(function(response){
               vm.userInfo.name = response.data.t.nickname;
			   vm.userInfo.imgPath = response.data.t.headimgurl
			   
			})
		}
		
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	.user-center {

	}

	.user-center-header {
		padding: px2em(100) 0 px2em(60);
		text-align: center;
		background-color: $colorBgWhite;
		@include font-dpr($font);
		margin-bottom: $marginBottom;

		img {
			width: px2em(200);
			height: px2em(200);
			border-radius: px2em(200);
		}

		p {
			line-height: 3;
		}
	}

	.user-center-body {
		// margin
	}
</style>