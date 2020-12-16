<template>
	<view class="class">
		<view class="left">
			<view 
				v-for="(item,index) in clas_list" 
				:class="[item.active?'active':'']"
				:key="index"
				@click="to_active(item)">
				{{item.label}}
			</view>
		</view>
		<view class="right">
			<view class="class-title">
				<view class="title">
					类别
				</view>
			</view>
			<view class="good-list">
				<view class="good-item">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="title">
						商品名称商品名称商品名称商品名称商品名称
					</view>
				</view>
				<view class="good-item">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="title">
						商品名称商品名称商品名称商品名称商品名称
					</view>
				</view>
				<view class="good-item">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="title">
						商品名称商品名称商品名称商品名称商品名称
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clas_list:[
					{
						label:'手机',
						active:false,
					},
					{
						label:'数码手机',
						active:true,
					}
				]
			};
		},
		methods:{
			to_active(item){
				this.clas_list.forEach(row=>row.active=false)
				item.active=true;
			}
		}
	}
</script>

<style lang="less" scoped>
	.class{
		display: flex;
		height: 100vh;
		.left{
			width: 200rpx;
			position: relative;
			font-size: 30rpx;
			>view{
				height: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				&.active{
					background-color: rgba(0,161,214,0.5);
					color: #00a1d6;
				}
			}
			&::after{
				position: absolute;
				content: '';
				height: 100%;
				background-color: #00a1d6;
				width: 1rpx;
				left: 199rpx;
				top: 0;
			}
		}
		.right{
			flex: 1;
			padding: 0 20rpx;
			box-sizing:border-box;
			.class-title{
				margin: 30rpx 0;
				height: 1rpx;
				background-color: #D8DBE5;
				position: relative;
				.title{
					color: #A1A1A1;
					font-size: 26rpx;
					background-color: #F7F7F7;
					padding: 0 10rpx;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
			.good-list{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-content:flex-start
			}
			.good-item{
				width: 250rpx;
				margin-bottom: 20rpx;
				image{
					height: 250rpx;
					width: 250rpx;
				}
				.title{
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					font-size: 30rpx;
				}
			}
		}
		.left,.right{
			overflow: auto;
		}
	}
</style>
