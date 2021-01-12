<template>
	<view class="header backimg{" :style="{
		paddingTop:top,
		
	}">
		<view class="header-top" :style="{
			height:top,
			backgroundColor:`rgba(237,115,144,${scrollTop/150})`
		}">
		</view>
		<view class="header-body"
			:style="{
				height:height||`340rpx`
			}">
			<view class="header-title" :style="{
				top,
				backgroundColor:`rgba(237,115,144,${scrollTop/150})`
			}">
				{{title}}
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	const top = uni.getSystemInfoSync().statusBarHeight + 'px'
	import back from '../assets/top.png'
	export default {
		props:{
			scrollTop:{},
			// back:{},
			height:{},
			title:{}
		},
		data() {
			return {
				top,
				back
			};
		}
	}
</script>

<style lang="less">
	.header{
		background-size: 100%;
		background-position: center;
		.header-body{
			height: 340rpx;
			padding-top: 88rpx;
			// 
			.header-title{
				height: 88rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-size: 26rpx;
				position: fixed;
				width: 100vw;
				z-index: 99;
			}
		}
		
		.header-top{
			position: fixed;
			top: 0;
			width: 100vw;
			z-index: 99;
		}
	}
	// rgba(251,114,153)
	
</style>
