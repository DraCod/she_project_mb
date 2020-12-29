<template>
	<view>
		<textarea 
			v-model="content" 
			class="textarea"
			placeholder="请输入你要反馈的问题" />
		<view class="submit" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			};
		},
		methods:{
			submit(){
				if(!this.content){
					this.message('请输入需要反馈的问题','none')
				}
				this.$http('post|mb/add-feedback',{
					content:this.content
				}).then(res=>{
					this.$message(res.msg)
					setTimeout(()=>{
						uni.navigateBack()
					},2000)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.textarea{
		font-size: 28rpx;
		width: 710rpx;
		background-color: #fff;
		margin: 0 auto;
		margin-top: 30rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.submit{
		width: 710rpx;
		height: 90rpx;
		border-radius: 45rpx;
		background-color: #fb7299;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 28rpx;
		margin: 0 auto;
		margin-top: 20rpx;
	}
</style>
