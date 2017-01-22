<!-- 
	我的课件详情
 -->

<template>
	<div>
		<div id="id_video_container" style="width:100%; height:auto;"></div>
		<card :card-data="cardData"></card>
		
		<h-audio v-for="item in audios" :audio-data="item"></h-audio>

		<div class="article">
			<div class="article-body article-body-padding">
				 <p  v-html="cardData.goodsDesc"></p>
			</div>
		</div>

		<div class="practice">
			<div class="practice-header"  v-if="!showQuestion">暂无相关习题</div>
			<div class="practice-header"  v-if="showQuestion">相关课程习题</div>
			<question :question-data="item" @increment="addScore" @reduce="reduceScore"  :show-result="showResult"  :question-index="index + 1" :clear="clear" v-for="(item, index) in courseQuestion"></question>
			<div class="btn btn-big" @click="showDialog"  v-if="showQuestion">习题测试结果</div>

			<div class="erweima" v-if="qrPath">
				<p>{{qrInfo}}</p>
			 
				<img  v-if="dpr1" :src="qrPath" alt="erweima">

				<a :href="qrPath" v-else>
					<img :src="qrPath" alt="erweima">
				</a>
			</div>

			<div class="erweima" v-else>
				<p>{{qrInfo}}</p>
			</div>
		</div>
		

		<div class="shade" v-if="dialogShow"></div>
		<div class="dialog icon-dialogbg" v-if="dialogShow">
			<div class="dislog-header">
				<div class="title">老师评语</div>
				<div class="dialog-close icon-dialogclose"></div>
			</div>
			<div class="dialog-body">
				<div class="icon icon-result">{{total}}分</div>
				<p>{{remark.p1}}</p>
				<p>{{remark.p2}}</p>
			</div>
			<div class="dialog-btns btns">
				<div class="btn" @click="reflashQuestion">不服来战</div>
				<div class="btn" @click="ok">我知道了</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import card from 'components/common/card/card.vue';
	import hAudio from 'components/common/audio/audio.vue';
	import question from 'components/common/question/question.vue';
	
	import courseImg from 'assets/img/course-detail.jpg';

	export default {
		components: {
			card, question, hAudio
		},
		data () {
			return {
				cardData: {
					url: '',
					params: {},
					title: '盘古开天第1集',
				},
				audios: [],
				courseDesc: {
					contents: [
						{
							content: 'Lorem ipsum dolor sit amet, consecteture adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque'
						}
					]
				},
				courseQuestion: [
					{
						label: '汉字”大“表示：（）',
						options: [
							{
								name: '站立着张开双臂的人'
							},{
								name: '蹲着的人'
							}
						],
						selected: 1,
						rightOptions: 0,
						result: true
					},{
						label: '汉字”大“表示：（）',
						options: [
							{
								name: '站立着张开双臂的人'
							},{
								name: '蹲着的人'
							}
						],
						selected: 1,
						rightOptions: 0,
						result: true
					},{
						label: '汉字”大“表示：（）',
						options: [
							{
								name: '站立着张开双臂的人'
							},{
								name: '蹲着的人'
							}
						],
						selected: 1,
						rightOptions: 0,
						result: true
					}
				],
				showResult : false,
				showQuestion : false,
				clear: false,
				audio: {
					time: '20'
				},
				level: {
					week : {
						p1 : '你很热爱汉字',
						p2 : '但还要多注意视频中讲到的细节哦！'
					},
					middle : {
						p1 : '哎呦',
						p2 : '不错哦！你学到了~'
					},
					good : {
						p1 : '你真棒！',
						p2 : '既冰雪聪明，又认真努力！'
					}
				},
				remark : {
					p1 : '',
					p2 : ''
				},
				total: 0,
				autioList:[],
				audioStatus: false,
				// audioLength: '',
				audioProgress: 0,
				dialogShow: false,
				lessonId: '',
				versionId: '',
				hasCoupon: false,
				qrPath: '',
				qrInfo: '',
				qrShow: false,
				lessonDetailUrl: 'usercenter/lessonDetail',
				lessonQuestionUrl: 'usercenter/lessonQuestion',
				lessonVoiceUrl: 'usercenter/lessonVoice',
				qrcodeUrl: 'usercenter/getDimension'
			}
		},
		computed: {
			dpr1 () {
				if (document.getElementsByTagName('html')[0].dataset.dpr == 1) {
					return true
				} else {
					return false
				}
				// console.log(document.get)
			}
		},
		mounted: function () {
			//document.getElementsByClassName("trump-volume-control")[0].style.display='none';
			// console.log(document.getElementsByClassName('trump-volume-control'));
			// setTimeout(function(){
			// 	if (document.getElementsByClassName("trump-volume-control").length != 0 ) {
			// 		document.getElementsByClassName("trump-volume-control")[0].style.display='none';	
			// 	}
			// }, 1000)
			this.$nextTick(function(){
				if (document.getElementsByClassName("trump-volume-control").length != 0 ) {
					document.getElementsByClassName("trump-volume-control")[0].style.display='none';	
				}
			})
		},
		watch: {
			audios () {

			}
		},
		methods: {
			initPlayer(){
				console.log("backup:" + this.cardData.isBackup)
				if(!this.cardData.isBackup){
					
					var player = new qcVideo.Player("id_video_container", {
						"width": document.body.clientWidth,
						"height": document.body.clientWidth*0.6,
						"hide_h5_setting": true,
						"file_id": this.cardData.vedioId,
						"app_id": "1253158809",
					});
				}else{
					var player = new qcVideo.Player("id_video_container", {
						"width": document.body.clientWidth,
						"height": document.body.clientWidth*0.6,
						"hide_h5_setting": true,
						"file_id": this.cardData.vedioId,
						"app_id": "1253277988",
					});
				}		
			},
			showDialog () {
				this.dialogShow = true;
				this.showResult = true;
				if(this.total <= 50){
					this.remark = this.level.week;
				}else if(this.total < 80){
					this.remark = this.level.middle;
				}else{
					this.remark = this.level.good;
				}
			},
			ok () {
				this.dialogShow = false
			},
			reflashQuestion () {
				this.total = 0;
				this.dialogShow = false;
				this.showResult = false;
				var vm = this;
				this.$http.get(this.lessonQuestionUrl, {params:{"lessonId" : this.lessonId, "versionId" : this.versionId}}).then(function(response){
				   vm.courseQuestion = response.data.t;
				   vm.clear = !vm.clear;
				});
				
			},
			addScore(){
				this.total += 20;
			},
			reduceScore(){
				this.total -= 20;
				if(this.total < 0){
					this.total =0;
				}
				
			},
			fetchData(){
				this.lessonId = this.$route.params.lessonId;
				this.versionId = this.$route.params.versionId;
				var vm = this;
				
				this.$http.get(this.lessonDetailUrl, {params:{"lessonId" : this.lessonId, "versionId" : this.versionId}}).then(function(response){
					if(response.data.result){
						vm.cardData = response.data.t;
						vm.cardData.imgPath = '';
						vm.initPlayer();
						
					}else{
						  layer.open({
							content: response.data.msg
							,btn: '我知道了'
						  });
						vm.$router.push({name: 'course'});  
					}
					
				});
				this.$http.get(this.lessonQuestionUrl, {params:{"lessonId" : this.lessonId, "versionId" : this.versionId}}).then(function(response){
				   vm.courseQuestion = response.data.t;
				   if(vm.courseQuestion.length > 0){
						vm.showQuestion = true;
				   }
				});
				vm.audio = [];
				this.$http.get(this.lessonVoiceUrl, {params:{"lessonId" : this.lessonId, "versionId" : this.versionId}}).then(function(response){
				   //vm.audios = response.data.t;
					for(var i=0; i<response.data.t.length; i++){
						var audioItem = {};
						audioItem.label = response.data.t[i].voiceWord;
						audioItem.audio = response.data.t[i].voicePath;
						audioItem.audioStatus = false;
						audioItem.audioProgress = 0;
						audioItem.time = response.data.t[i].time;
						
						vm.audios.push(audioItem);
					}
				});
				
				this.$http.get(this.qrcodeUrl).then(function(response){
					if(response.data.msg){
						vm.qrShow = true;
						 vm.qrPath = response.data.msg;
					}else{
						vm.qrShow = false;
					}
					vm.qrInfo = response.data.t;
				  
				});
			}
		},
		created (){
			var vm = this;
			vm.fetchData();
		},
		watch:{
			  '$route':'fetchData'
		}
	}
</script>

<style lang="scss">
	@import '~assets/css/functions';
	// 视频插件
	#trump_main_unique_1 {
		img {
			top: 0 !important;
			left: 0 !important;

			width: 100% !important;
			height: px2em(450) !important;
		}
	}

	.trump-volume-control {
		display: none !important;
	}
</style>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	$colorPink: #fed2c9;
	// $dialog

	.btn {
		height: px2em(84);
		margin: 0 $paddingRight $marginBottom $paddingLeft;
		line-height: px2em(84);
		color: $colorWhite;
		background-color: $colorTitleRed;
		text-align: center;
		@include font-dpr($font);
		border-radius: 6px;
	}
	
	.practice {

	}

	.practice-header {
		line-height: px2em(110);
		@include font-dpr($font);
		text-align: center;
		background-color: $colorBgWhite;
		border-bottom: 1px solid $colorLine;
	}
	.erweima {
		padding: $paddingRight;
		background-color: $colorBgWhite;
		text-align: center;

		p {
			margin-bottom: px2em(30)
		}
	}

	.dialog {
		position: fixed;
		top: 20%;
		left: 0;
		right: 0;
		width: px2em(560);
		height: px2em(680);
		margin: 0 auto;
		z-index: 100;
	}
	.dislog-header {
		height: px2em(150);
		padding-top: px2em(50);
		line-height: px2em(100);
		color: #fff;
		text-align: center;
		@include font-dpr(26px);
	}
	.dialog-close {
		position: absolute;
		top: 0;
		right: 0;
	}
	.dialog-body {
		text-align: center;
		@include font-dpr($font);
		
		.icon {
			margin: 0 auto;
			margin-top: px2em(20);
			padding-top: px2em(190);
			color: #fff;
		}
	}
	.dialog-btns {
		text-align: center;

		.btn {
			margin: px2em(30) px2em(20);
			border-radius: px2em(20);
		}
	}
	.trump-volume-control{
		display: none;
	}
</style>