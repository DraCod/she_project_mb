<template>
	<view class="content">
		<view class="header">
			<view class="input">
				<view class="iconfont icon-sousuo"></view>
				输入关键词
			</view>
		</view>
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<image :src="img" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<view class="activity">
			<view v-for="(item,index) in active_arr" class="activity-item" :key="index">
				<image :src="item.img" mode=""></image>
				<view class="">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="classify-box">
			<view class="classify">
				<view 
					v-for="(item,index) in class_list"
					@click="to_active(item)"
					:class="[item.active?'active':'']" 
					:key='index'>
					{{item.label}}
				</view>
			</view>
		</view>
		<view class="good-list">
			<view class="good-item" v-for="(item,index) in 5" :key="index">
				<image src="../../static/my-active.png" mode="aspectFill"></image>
				<view class="info-box">
					<view class="title">
						商品名称 商品名称 商品...商品名称 商品名称 商品...
					</view>
					<view class="price">
						价格
						<view class="num">
							200
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import img from '../../assets/banner1.jpg'
	import zhekou from '../../assets/zhekou2.png'
	import choujiang from '../../assets/choujiang.png'
	import touzhu from '../../assets/touzhu.png'
	import neigou from '../../assets/neigou.png'
	export default {
		data() {
			return {
				search_text:'',
				img,
				active_arr:[
					{
						img:zhekou,
						title:'折扣',
					},
					{
						img:choujiang,
						title:'抽奖',
					},
					{
						img:touzhu,
						title:'投注',
					},
					{
						img:neigou,
						title:'内购'
					}
				],
				class_list:[
					{
						label:'手机',
						active:true,
						value:1
					},
				]
			}
		},
		mounted(){
			
		},
		methods: {
			to_active(item){
				this.class_list.forEach(row=>row.active=false)
				item.active=true;
			}
		}
	}
</script>

<style lang='less' scoped>
	.header{
		width: 750rpx;
		height: 278rpx;
		background: #00a1d6;
		border-radius: 0 0 25% 25%;
		.input{
			width: 630rpx;
			height: 60rpx;
			background: #FFFFFF;
			border-radius: 31px;
			margin: 0 auto;
			line-height: 60rpx;
			box-sizing: border-box;
			text-align: center;
			color: #D8DBE5;
			font-size: 28rpx;
			position: relative;
			.icon-sousuo{
				position: absolute;
				left: 20rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	.swiper{
		width: 710rpx;
		height: 270rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 0 auto;
		display: block;
		margin-top: -200rpx;
		image{
			height: 100%;
			width: 100%;
		}
	}
	.activity{
		width: 710rpx;
		height: 190rpx;
		background: #FFFFFF;
		border-radius: 20px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		align-items: center;
		.activity-item{
			display: flex;
			flex-direction:column;
			align-items: center;
			font-size: 26rpx;
			image{
				height: 100rpx;
				width: 100rpx;
			}
		}
	}
	
	.classify{
		display: flex;
		flex-wrap: nowrap;
		margin: 20px auto;
		padding: 0 35rpx;
		font-size: 28rpx;
		white-space: nowrap;
		view+view{
			margin-left: 100rpx;
		}
		.active{
			position: relative;
			color: #00a1d6;
			&::after{
				content: '';
				width: 57rpx;
				height: 4rpx;
				background: #00a1d6;
				border-radius: 2px;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0;
			}
		}
	}
	.classify-box{
		overflow: auto;
	}
	
	.good-list{
		padding-left: 20rpx;
		box-sizing: border-box;
		overflow: hidden;
		.good-item{
			width: 345rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			float: left;
			image{
				width: 345rpx;
				height: 345rpx;
				border-radius: 10rpx;
			}
			.info-box{
				padding: 20rpx;
			}
			.title{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 26rpx;
				margin-top: 10rpx;
			}
			.price{
				font-size: 26rpx;
				color: #666;
				margin-top: 16rpx;
			}
			.num{
				color: #FF0131;
				display: inline;
				font-size: 34rpx;
				margin-left: 10rpx;
			}
		}
	}
</style>
