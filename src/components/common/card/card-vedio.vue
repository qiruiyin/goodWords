<!-- 
	视频卡片
 -->

<template>
	<div class="card">
		<div id="id_video_container" style="width:100%; height:auto;"></div>
		<div class="card-body">
			<h3>{{ cardData.title }}</h3>
			<div v-if="cardData.price" class="price">{{ cardData.price }}<span> x {{ cardData.num }}集</span></div>
			<ul class="actions" v-if="cardData.actions">
				<li :class="item.num > 0 ? 'icon-'+item.value+'_active' : 'icon-'+item.value" v-for="(item, index) in filterActions" @click="setActionNums(index)">
					{{ item.name }}
				</li>
			</ul>

			<ul class="status" v-if="cardData.status">
				<li :class="[!item.choosed ? 'icon-'+item.value : 'active icon-'+item.value+'_active']" v-for="(item, index) in filterStatus">
					已{{ item.choosed ? item.name : item.nameFalse }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		props: ['cardData'],
		data () {
			return {
				cardTitle: "",
				actions: [
					{
						name: "点赞",
						value: 'zan',
						choosed: false,
						num: 0
					},{
						name: '收藏',
						value: 'store',
						choosed: false,
						num: 0
					},{
						name: '购物车',
						value: 'cart',
						choosed: false,
						num: 0
					}
				],
				status: [
					{
						name: '收藏',
						nameFalse: '取消',
						value: 'store'
					}
				]
			}
		},
		computed: {
			filterActions () {
				let actions = this.cardData.actions || []
				return this.actions.filter(function(elem, index) {
					return actions.indexOf(elem.value) != -1
				})
			},
			filterStatus () {
				let cardDataStatus = this.cardData.status || []
				let status = this.status
				cardDataStatus.map(function(elem, index){
					for(let i = 0; i < status.length; i++) {
						if (elem.value == status[i].value) {
							elem = Object.assign(elem, status[i]);		
						}
					} 
				})
				return cardDataStatus
			}
		},
		mounted: function () {
			var player = new qcVideo.Player("id_video_container", {
		    "width": document.body.clientWidth,
		    "height": document.body.clientWidth*0.6,
		    "hide_h5_setting": false,
		    "file_id": "14651978969500594505",
			"app_id": "1253158809",
			})
		},
		methods: {
			setActionNums(ind) {
				this.actions[ind].num += this.actions[ind].choosed ? -1 : 1
				this.actions[ind].choosed = !this.actions[ind].choosed
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	.card {
		position: relative;
		margin-bottom: $marginBottom;
		@include font-dpr($fontLabel);
		background: $colorBgWhite;
	}

	.card-status {
		position: absolute;
		top: px2em(20);
		right: px2em(20);
		width: px2em(70);
		height: px2em(70);
		background: url('~assets/img/spriter/new.png') no-repeat;
		background-size: 100% 100%;
	}

	.card-body {
		position: relative;
		padding: px2em(25) $paddingRight px2em(25) $paddingLeft
	}

	h3 {
		@include font-dpr($font);
		color: $colorTitleBlack;
		font-weight: normal;
	}

	.price {
		padding-top: px2em(20);
		color: $colorTitleRed;
		@include font-dpr($font);

		span {
			@include font-dpr($fontLabel);
			color: $colorSubText;
		}
	}

	.actions, .status {
		position: absolute;
		top: px2em(60);
		right: $paddingRight;
		@include font-dpr($fontLabel);

		li {
			position: relative;
			float: left;
			width: px2em(100);
			padding-top: px2em(50);
			display: block;
			text-align: center;
			color: $colorTips;
		}
	}

	.status {
		top: px2em(100);

		li {
			width: px2em(140);
			padding-top: 0;
			padding-left: px2em(40);
			line-height: px2em(50);
			background-position: left !important;

			&.active {
				color: $colorTitleRed;
			}
		}
	}
</style>