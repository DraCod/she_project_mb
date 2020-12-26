<template>
	<view class="comment-item">
		<view class="user">
			<image :src="item.user.avatarUrl" mode=""></image>
			<view class="name">
				{{item.user.userName}}
				<view class="start-box">
					<view
						class="iconfont icon-shoucang active" 
						v-for="(ite,index) in item.num"
						:key='index'>
					</view>
					<view
						class="iconfont icon-shoucang" 
						v-for="(ite,index) in 5-item.num"
						:key='index'>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			{{item.content}}
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:{}
		},
		
	}
</script>

<style lang="less" scoped>
	.comment-item{
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		.user{
			font-size: 24rpx;
			display: flex;
			align-items: center;
			image{
				height: 50rpx;
				width: 50rpx;
				border-radius: 50%;
			}
			.name{
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				.start-box{
					display: flex;
					.iconfont{
						font-size: 24rpx;
						color: #ccc;
						&.active{
							color: #FF7800;
						}
					}
					>view+view{
						margin-left: 10rpx;
					}
				}
			}
		}
		.content{
			margin-top: 20rpx;
			font-size: 24rpx;
		}
	}
</style>
