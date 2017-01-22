<template>
	<div class="course-spree">
		<card class="spree-card" showDetail="true" :card-data="courseData"></card>
		<ul class="time-choose">
			<li :class="{'current': item.isDefault}" v-for="(item, index) in timeChoose" @click="setTimeCurrent(item)">{{ item.versionName }}</li>
		</ul>

		<div class="article">
			<div class="article-header">{{ courseDesc.title }}</div>
			<div class="article-body article-body-padding" v-html="courseData.goodsDesc">
			</div>
		</div>

		<div class="article">
			<div class="article-header">{{ recommendCourse.title }}</div>
			<div class="article-body article-body-bg">
				<card v-for="item in recommendCourse.data" :card-data="item"></card>
			</div>
		</div>
		
		<div class="footer-btn">
			<div class="icon"  @click="addShopcart"><div class="icon-cart_active"></div>{{addShopcartButton}}</div>
			<div class="submit" @click="buy">立即购买</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import card from 'components/common/card/card.vue'

	import card1 from 'assets/img/card1.jpg'
	import card2 from 'assets/img/card2.jpg'

	export default {
		components: {
			card
		},
		data () {
			return {
				courseDetailUrl: 'course/courseDetail',
				addShopcartUrl: 'shopcart/addShopcart',
				buyUrl: 'shopcart/addShopcart',
				courseId : '',
				courseType: '',
				courseData : {},
				timeChoose : [],
				timeCurrent : -1,
				courseDesc : {},
				versionChecked : {},
				addShopcartButton: "加入购物车",
				recommendCourse : {
					title: '推荐课程',
					data : []
				}
				/**
				courseData: {
					imgPath: card1,
					url: '',
					params: '',
					title: '汉字思维免费礼包（5集）',
					price: '￥2000.00',
					num: 5,
					actions: ['zan', 'store', 'cart']
				},
				timeChoose: [
					{
						name: '大朋友',
					},{
						name: '小朋友',
					}
				],
				timeCurrent: -1,
				courseDesc: {
					title: '课程介绍',
					contents: [
						{
							content: 'Lorem ipsum dolor sit amet, consecteture adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque'
						},{
							content: 'penatibus et magnis dis parturient montes, nascetur ridiculusmus. Nam fermentum, nulla lustus pharetra vulputate, felis tell us mollis orci, sed rhoncus sapien nunc eget odio.'
						}
					]
				},

				recommendCourse: {
					title: '推荐课程',
					data: [
						{
							imgPath: card1,
							url: 'courseSimple',
							params: { 'courseId': 1 },
							title: '汉字思维免费礼包（5集）',
							price: '￥2000.00',
							num: 4,
						},{
							imgPath: card2,
							url: 'courseSimple',
							params: { 'courseId': 1 },
							title: '汉字思维免费礼包（5集）',
							price: '￥2000.00',
							num: 5,
						},{
							imgPath: card1,
							url: 'courseSimple',
							params: { 'courseId': 1 },
							title: '汉字思维免费礼包（5集）',
							price: '￥2000.00',
							num: 5
						}
					]
				}
				**/
			}
		},
		created: function(){
			var vm = this;
			vm.fetchData();
			
		},
		methods: {
			setTimeCurrent (item) {
				for(var i=0; i<this.timeChoose.length; i++){
					if(item == this.timeChoose[i]){
						item.isDefault = true;
						this.courseData.price = item.price;
						this.versionChecked = item;
					}else{
						this.timeChoose[i].isDefault = false;
					}
					
				}
			},
			fetchData(){
				this.courseId = this.$route.params.courseId;
				//console.log('courseId: ' + this.courseId);
				this.courseType = this.$route.params.courseType;
				var vm = this;
				this.$http.get(this.courseDetailUrl, {params:{"courseId" : this.courseId, "courseType": this.courseType}}).then((response)=>{
				   vm.courseData = response.data.t.courseData;
				   vm.timeChoose = response.data.t.timeChoose;
				   vm.recommendCourse.data = response.data.t.recommendCourse;
				   for(var i=0; i<vm.timeChoose.length; i++){
						if(vm.timeChoose[i].isDefault){
						vm.versionChecked = vm.timeChoose[i];
						}
					}
				})
			},
			buy () {
				// 先获取要传递的数据，
				var vm = this;
				var vm = this;
				if(!vm.versionChecked || !vm.versionChecked.courseVersionId){
					layer.open({
						content: '请选择您要购买的版本'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
					  
					  return;
				}
				vm.$http.post(vm.buyUrl, {"versionId": vm.versionChecked.courseVersionId, "courseId" : vm.courseId, "courseType" : vm.courseType})
                .then((response) => {
                    this.$router.push({name: 'shopCart'});
                })	
			},
			addShopcart(){
				var vm = this;
				if(!vm.versionChecked || !vm.versionChecked.courseVersionId){
					layer.open({
						content: '请选择您要购买的版本'
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
					  
					  return;
				}
				
				this.addShopcartButton="已加入购物车";
				vm.$http.post(vm.addShopcartUrl, {"versionId": vm.versionChecked.courseVersionId, "courseId" : vm.courseId, "courseType" : vm.courseType})
				.then((response) => {})
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
	
	$btnBg: $colorTitleRed;

	.course-spree {
		.spree-card {
			margin-bottom: 0;
		}	
	}
	
	.time-choose {
		width: 100%;
		padding: px2em(20);
		margin-bottom: $marginBottom;
		background-color: $colorBgWhite;
		border: 1px solid $colorLine;

		li {
			padding: px2em(20);
			border: 1px solid $colorLine;
			margin-right: px2em(20);
			border-radius: 6px;
			display: inline-block;

			&.current {
				border-color: $colorTitleRed;
				color: $colorTitleRed;
			}
		}
	}

	// .btn-buy {
	// 	position: fixed;
	// 	left: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	width: 100%;
	// 	height: px2em(110);
	// 	line-height: px2em(110);
	// 	background-color: $btnBg;
	// 	text-align: center;
	// 	@include font-dpr($font);
	// 	color: $colorWhite;
	// }

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
		@include font-dpr($font);
		z-index: 9;

		.icon {
			position: relative;
			width: px2em(320);
			color: $colorSubText;
		}

		.submit {
			flex: 1;
			color: $colorWhite;
			background-color: $colorTitleRed;
		}
	}

	.icon-cart_active {
		position: absolute;
		top: 50%;
		left: px2em(40);
		margin-top: - px2em(20); //取自图片大小
	}
</style>