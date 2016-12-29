<!-- 
	我要咨询
 -->

<template>
	<div class="my-consult-add">
		<div class="my-consult-add-body">
			<input v-model="consult.title" type="text" placeholder="咨询标题">
			<textarea v-model="consult.content" :maxlength="maxlength" placeholder="咨询内容（如果您有任何问题需要咨询，请告诉我们，我们的工作人员会尽快回复您的~~）"></textarea>
			<span>1000字</span>
		</div>

		<div class="btn btn-big btn-submit" @click="submit">提交</div>
	</div>
</template>

<script type="text/babel">
	export default {
		data () {
			return {
				maxlength: 1000,
				consult: {
					title: '',
					content: ''
				}
			}
		},
		methods: {
			submit () {
				this.$router.push({name: 'myConsult'})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';
	
	.my-consult-add {

	}

	.my-consult-add-body {
		position: relative;
		@include font-dpr($font);
		padding: $paddingLeft $paddingRight 0 $paddingLeft;
	}

	input {
		width: 100%;
		border: 0;
		border-radius: $borderRadius;
		line-height: $inputHeight;
		text-align: center;
		margin-bottom: $marginBottom;
	}

	textarea {
		position: relative;
		width: 100%;
		height: px2em(800);
		padding: px2em(30);
		border: 0;
		line-height: 1.75;
		border-radius: $borderRadius;
	}

	span {
		position: absolute;
		bottom: 0;
		left: $paddingLeft;
		right: $paddingRight;
		height: px2em(60);
		line-height: px2em(60);
		text-indent: px2em(20);
		background-color: $colorBgWhite;
		border-radius: $borderRadius;
	}
</style>