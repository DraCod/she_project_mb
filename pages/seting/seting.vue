<template>
	<view class="setting">
		<view class="seting-item">
			<view class="">
				头像
			</view>
			<image :src="getUser.avatarUrl||user" class="avator" mode=""></image>
		</view>
		<view class="seting-item" @click="edit_name">
			<view class="">
				用户名
			</view>
			<view class="">
				{{getUser.otherName||'未登录'}}
			</view>
		</view>
		
		<view class="seting-item m-top" @click="to_feedback">
			<view class="">
				问题反馈
			</view>
			<view class="iconfont icon-arrow-r"></view>
		</view>
		<view class="seting-item" @click="to_about">
			<view class="">
				关于我们
			</view>
			<view class="iconfont icon-arrow-r"></view>
		</view>
		<view class="seting-item">
			<view class="">
				支付密码
			</view>
			<view class="iconfont icon-arrow-r"></view>
		</view>
	</view>
</template>

<script>
	import user from '../../assets/user.jpeg';
	export default {
		data() {
			return {
				user,
			};
		},
		onShow() {
			this.get_userinfo();
		},
		methods:{
			to_about(){
				uni.navigateTo({
					url:`/pages/about/about`
				})
			},
			edit_name(){
				uni.navigateTo({
					url:`/pages/edit-name/edit-name`
				})
			},
			to_feedback(){
				uni.navigateTo({
					url:`/pages/feedback/feedback`
				})
			},
			get_userinfo(){
				this.$http('get|mb/get-user-info').then(res=>{
					this.$store.dispatch('setUser',res);
				})
			},
		},
		computed:{
			getUser(){
				return this.$store.getters.getUser
			}
		},
	}
</script>

<style lang="less" scoped>
	.setting{
		.seting-item{
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			padding: 0 30rpx;
			box-sizing: border-box;
			align-items: center;
			font-size: 26rpx;
			.avator{
				height: 80rpx;
				width: 80rpx;
			}
		}
		.m-top{
			margin-top: 30rpx;
		}
	}
</style>
