<!--
	图文混排 
 -->
<template>
	<div :class="['img-text', {'img-text-check': imgTextData.hasCheck}]" @click="setCheck">
		<div v-if="imgTextData.hasCheck" :class="['checkbox', imgTextData.check ? 'icon-check_yuan': 'icon-uncheck_yuan']"></div>
		<img :src="imgTextData.imgPath" alt="图片">
		<div class="img-text-content">
			<p class="title">{{ imgTextData.title }}</p>
			<p class="version" v-if="imgTextData.version">{{ imgTextData.version }}</p>
			<p class="price" v-if="imgTextData.price">
				{{ imgTextData.price }}
				<span v-if="imgTextData.num">x{{ imgTextData.num }}集</span>
			</p>
		</div>
	</div>
</template>

<script type="text/babel">

	export default {
		props: ['imgTextData'],
		data () {
			return {

			}
		},
		methods: {
			setCheck () {
				this.imgTextData.check = !this.imgTextData.check
				this.$emit('on-check', this.imgTextData.check)
			},
			setChecked () {
				this.imgTextData.check = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	$imgTextPadding: px2em(30);

	.img-text {
		position: relative;
		padding: $imgTextPadding $paddingRight $imgTextPadding $paddingLeft;
		background-color: $colorWhite;
		border-bottom: 1px solid $colorLine;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;

		&.img-text-check {
			padding-left: px2em(80);
		}

		img {
			width: px2em(130);
			height: px2em(130);
			display: block;
		}
	}

	.img-text-content {
		-webkit-box-flex: 1;
	  -moz-box-flex: 1;
	  -webkit-flex: 1;
	  -ms-flex: 1;
	  flex: 1;
		padding-left: $paddingLeft;
		@include font-dpr($font);
		line-height: 2;

		.title {
			color: $colorTitleBlack;
		}

		.version {
			padding: 0 px2em(10);
			border: px2em(2) solid $colorTitleRed;
			color: $colorTitleRed;
			border-radius: px2em(6);
			display: inline-block;
		}

		.price {
			color: $colorTitleRed;

			span {
				color: $colorSubText;
				margin-left: px2em(10);
			}
		}
	}
	
	.checkbox {
		position: absolute;
		top: 50%;
		left: $paddingLeft;
		margin-top: - px2em(17);
	}

</style>