<template>
	<view>
		<view class="name-box">
			<input type="text" v-model="name" placeholder="请输入需要修改的名字"/>
			<view class="iconfont icon-guanbi" @click="name=''"></view>
		</view>
		<view class="submit" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:''
			};
		},
		mounted(){
			this.name = this.getUser.otherName
		},
		methods:{
			submit(){
				if(this.name==''){
					this.$message('请输入名字','none');
					return
				}
				this.$http('post|mb/edit-name',{
					name:this.name
				}).then(res=>{
					this.$message(res.msg);
					setTimeout(()=>{
						uni.navigateBack()
					},2000)
				})
			}
		},
		computed:{
			getUser(){
				return this.$store.getters.getUser
			}
		},
	}
</script>

<style lang="less" scoped>
	.name-box{
		background-color: #fff;
		position: relative;
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		input{
			height: 100%;
			width: 100%;
		}
		.icon-guanbi{
			z-index: 10;
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
			color: #ccc;
		}
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
