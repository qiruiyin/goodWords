<!-- 
	购买的卡片
 -->

<template>
	<div class="no-result" v-if="noResult">{{msg}}</div>
</template>

<script type="text/babel">
	export default {
		props: ['cardData', 'msg'], 
		computed: { 
			noResult: function(){
				if(this.cardData){
					return this.cardData.length == 0;
				}else{
					return true;
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~lib/sandal/core';
	@import '~assets/css/vars', '~assets/css/functions';

	.no-result{
	    padding-top: 40px;
		text-align: center;
	}
</style>