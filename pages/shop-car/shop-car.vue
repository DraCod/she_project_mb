<template>
	<view class="shop-car">
		<view class="good-list-item">
			<checkbox :checked="check" color="#00a1d6"/>
			<image src="../../static/logo.png" mode="aspectFill"></image>
			<view class="">
				<view class="">
					商品信息商品信息商品信息商品信息商品信息商品信息
				</view>
			</view>
		</view>
		
		<view class="option">
			<view class="flex">
				<checkbox :checked="check" color="#00a1d6"/>
				<view class="check-text">
					全选
				</view>
				<view class="all-price flex">
					总价：
					<view class="price">
						200
					</view>
				</view>
			</view>
			<view class="button">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				check:false
			};
		},
	
	}
</script>

<style lang="less" scoped>
	.good-list-item{
		background-color: #fff;
		padding: 0 20rpx;
		box-sizing: border-box;
		height: 250rpx;
		image{
			height: 200rpx;
			width: 200rpx;
		}
	}
	.shop-car{
		height: 100vh;
		padding-bottom: 100rpx;
		box-sizing: border-box;
		.option{
			background-color: #FFFFFF;
			height: 100rpx;
			width: 100%;
			position: fixed;
			bottom: 0;
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.flex{
				display: flex;
				align-items: center;
			}
			.check-text{
				font-size: 24rpx;
				color: #D8DBE5;
			}
			.all-price{
				font-size: 24rpx;
				color: #666666;
				margin-left: 40rpx;
				.price{
					color: #FF0131;
					font-size: 34rpx;
				}
			}
		}
		.button{
			width: 178rpx;
			height: 72rpx;
			background: #00a1d6;
			border-radius: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26rpx;
			color: #fff;
		}
	}
</style>
