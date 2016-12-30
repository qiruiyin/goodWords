<!-- 
	我的课件详情
 -->

<template>
	<div>
		<card :card-data="cardData"></card>
		
		<div class="audio">
			<div class="label"><i></i>字</div>
			<div ref="audio" :class="['audio-play', {'active': audioStatus}]">
				<div class="progress" :style="{width: audioProgress + 'px'}"></div>
				<div class="audio-title">课程重点摘要
					<div :class="['icon', 'audio-btn', audioStatus ? 'icon-audio_pause' : 'icon-audio_start']" @click="setAudio"></div>
					<div class="audio-time">{{ audio.time }}”</div>
				</div>
			</div>
			<audio id="audio" preload="auto">
			  <source src="http://localhost:8088/static/music.mp3" type="audio/mpeg" />
			</audio>
		</div>

		<div class="article">
			<div class="article-body article-body-padding">
				<template v-for="item in courseDesc.contents">
					<p>{{ item.content }}</p>
				</template>
			</div>
		</div>
		
		<div class="practice">
			<div class="practice-header">相关课程习题</div>
			<question :question-data="item" :question-index="index + 1" v-for="(item, index) in courseQuestion"></question>
			<div class="btn btn-big">老师评语</div>

			<div class="erweima">
				<p>扫一扫下方二维码加入我们的课后讨论群</p>
				<img src="~assets/img/erweima.jpg" alt="erweima">
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import card from 'components/common/card/card.vue';
	import question from 'components/common/question/question.vue';
	
	import courseImg from 'assets/img/course-detail.jpg';

	export default {
		components: {
			card, question
		},
		data () {
			return {
				cardData: {
					imgPath: courseImg,
					url: '',
					params: {},
					title: '盘古开天第1集',
				},
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
				audio: {
					time: '20'
				},
				audioStatus: false,
				// audioLength: '',
				audioProgress: 0
			}
		},
		methods: {
			setAudio () {
				let self = this
				let $audio = document.getElementById('audio')
				let audioLength = this.$refs.audio.getBoundingClientRect().width
				// let time = this.audio.time
				let duration = $audio.duration
				let $progress = document.querySelector('.progress')

				this.audioStatus = !this.audioStatus
				if (this.audioStatus) {
					$audio.play()
					setInterval(function(argument) {
						let currentTime = $audio.currentTime
						self.audioProgress = currentTime/duration * audioLength
					}, 10)
				} else {
					$audio.pause()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	$colorPink: #fed2c9;

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

	.audio {
		padding: $paddingLeft $paddingRight $paddingLeft $paddingLeft;
		background-color: $colorBgWhite;
		margin-bottom: $marginBottom;
		display: flex;
		// @extend %clearfix;

		.label {
			position: relative;
			width: px2em(60);
			height: px2em(60);
			line-height: px2em(60);
			text-align: center;
			color: $colorTitleRed;
			background-color: $colorBg;

			&:before, &:after, i:before, i:after {
				content: "";
				position: absolute;
				top: -1px;
				left: -1px;
				width: px2em(10);
				height: px2em(10);
				border: px2em(2) solid $colorTitleRed;
				border-right: 0;
				border-bottom: 0;
			}

			&:after {
				left: auto;
				right: -1px;
				border-right: px2em(2) solid $colorTitleRed;
				border-left: -0;
			}

			i {
				&:before {
					top: auto;
					bottom: -1px;
					border-top: 0;
					border-bottom: px2em(2) solid $colorTitleRed;
				}
				&:after {
					top: auto;
					bottom: -1px;
					left: auto;
					right: -1px;
					border: 0;
					border-right: px2em(2) solid $colorTitleRed;
					border-bottom: px2em(2) solid $colorTitleRed;
				}
			}
		}

		.audio-play {
			position: relative;
			width: px2em(620);
			height: px2em(60);
			line-height: px2em(60);
			margin-left: px2em(20);
			border-radius: px2em(60);
			background-color: $colorBg;
    	overflow: hidden;

    	&.active {
    		.audio-time {
    			color: $colorTitleRed
    		}
    	}

			.progress {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 0;
				height: 100%;
				background-color: $colorPink;
				z-index: 1;
			}
		}
		
		.audio-title {
			position: relative;
			text-align: center;
			z-index: 2;
		}

		.audio-time {
			position: absolute;
			right: px2em(20);
			top: 0;
		}

		.audio-btn {
			position: absolute;
			top: 50%;
			left: px2em(20);
			margin-top: - px2em(10); // 取自图片大小
		}
	}
</style>