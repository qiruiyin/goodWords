<!--
	图文混排 
 -->
<template>
	<div class="img-text">
		<slot name="check"></slot>
		<img :src="imgTextData.imgPath" alt="图片">
		<div class="img-text-content">
			<p class="title">{{ imgTextData.title }}</p>
			<p class="price">{{ imgTextData.price }}<span>x{{ imgTextData.num }}集</span></p>
		</div>
	</div>
</template>

<script type="text/babel">

	export default {
		props: ['imgTextData'],
		data () {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	$imgTextPadding: px2em(30);

	.img-text {
		padding: $imgTextPadding $paddingRight $imgTextPadding $paddingLeft;
		background-color: $colorWhite;
		border-bottom: 1px solid $colorLine;
		display: flex;

		img {
			width: px2em(130);
			height: px2em(130);
			display: block;
		}
	}

	.img-text-content {
		flex: 1;
		padding-left: $paddingLeft;
		@include font-dpr($font);
		line-height: 2;

		.title {
			color: $colorTitleBlack;
		}

		.price {
			color: $colorTitleRed;

			span {
				color: $colorSubText;
				margin-left: px2em(10);
			}
		}
	}
</style>