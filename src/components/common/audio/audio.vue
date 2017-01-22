<template>
	<div class="audio">
		<div class="label"><i></i>{{ audioData.label }}</div>
		<div ref="audio" :class="['audio-play', {'active': audioData.audioStatus}]">
			<div class="progress" :style="{width: audioData.audioProgress + 'px'}"></div>
			<div class="audio-title">课程重点摘要
				<div :class="['icon', 'audio-btn', audioData.audioStatus ? 'icon-audio_pause' : 'icon-audio_start']" @click="setAudio"></div>
				<div class="audio-time">{{ audioData.time }}”</div>
			</div>
		</div>
		<audio ref="audioSrc" preload="auto">
		  <source :src="audioData.audio" type="audio/mpeg" />
		  <source :src="audioData.audio" type="audio/mp3" />
		  <embed :src="audioData.audio" type="audio/mp3" />
		</audio>
	</div>
</template>

<script type="text/babel">
	export default {
		props: ['audioData'],
		methods: {
			setAudio () {
				let self = this
				let $audio = self.$refs.audioSrc
				let audioLength = this.$refs.audio.getBoundingClientRect().width
				let duration = $audio.duration
				this.audioData.audioStatus = !this.audioData.audioStatus
				if (this.audioData.audioStatus) {
					$audio.play()
					setInterval(function() {
						let currentTime = $audio.currentTime
						self.audioData.audioProgress = currentTime/duration * audioLength
					}, 10)
				} else {
					$audio.pause()
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	$colorPink: #fed2c9;

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