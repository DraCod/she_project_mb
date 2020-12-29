<template>
	<view>
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			};
		},
		mounted(){
			this.$http('get|pc/get-text',{
				id:1
			}).then(res=>{
				this.content = res.data.content
			})
		}
	}
</script>

<style lang="less">

</style>
