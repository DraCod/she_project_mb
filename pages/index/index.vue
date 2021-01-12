<template>
	<scroll-view class="content" style="height: 100vh;background-color: #F7F7F7;" @scroll="scroll" scroll-y="true">
		<ui-header :scrollTop="scrollTop" :back="back" height="460rpx" title="首页">
			<view class="header">
				<view class="input" @click="to_search">
					<view class="iconfont icon-sousuo"></view>
					输入关键词
				</view>
			</view>
		</ui-header>
		<view class="to-no-back"></view>
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in banner_list" :key='index'>
				<image :src="item.path" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<view class="activity">
			<view v-for="(item,index) in active_arr" class="activity-item" @click="to_page(item)" :key="index">
				<image :src="item.img" mode=""></image>
				<view class="">
					{{item.title}}
				</view>
			</view>
		</view>
		<!-- <view class="classify-box">
			<view class="classify">
				<view 
					v-for="(item,index) in class_list"
					@click="to_active(item)"
					:class="[item.active?'active':'']" 
					:key='index'>
					{{item.label}}
				</view>
			</view>
		</view> -->
		<view 
			:style="{
				'background-image':`url(${item.path})`
			}"
			v-for="(item,index) in advert" 
			:key='index' 
			class="advert"></view>
		<view class="hot">
			热卖商品
		</view>
		<view class="good-list">
			<view class="good-item" v-for="(item,index) in list" @click="to_detail(item)" :key="index">
				<image :src="url+item.main.path" mode="aspectFill"></image>
				<view class="info-box">
					<view class="title">
						{{item.goods}}
					</view>
					<view class="price">
						¥
						<view class="num">
							{{item.price}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import img from '../../assets/banner1.jpg'
	import zhekou from '../../assets/zhekou2.png'
	import choujiang from '../../assets/choujiang.png'
	import touzhu from '../../assets/touzhu.png'
	import neigou from '../../assets/neigou.png'
	import uiHeader from '../../components/header.vue'
	// import back from '../../assets/top.png'
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
				],
				list:[],
				banner_list:[],
				advert:[],
				url:'',
				scrollTop:0,
			}
		},
		onShow(){
			this.url=this.$url;
			// this.get_classify();
			this.get_list();
			this.get_banner();
		},
		methods: {
			get_banner(){
				this.$http('get|pc-advert-list',{
					type:1
				}).then(res=>{
					this.banner_list=res.data.map(row=>{
						row.path = this.$url+row.path.path
						return row
					})
				})
				this.$http('get|pc-advert-list',{
					type:2
				}).then(res=>{
					this.advert=res.data.map(row=>{
						row.path = this.$url+row.path.path
						return row
					})
				})
			},
			get_list(){
				this.$http('get|mb/recommend-list').then(res=>{
					this.list=res.data;
				})
			},
			get_classify(){
				this.$http('get|pc/classify-list').then(res=>{
					this.class_list = res.data.map(row=>{
						return{
							label:row.classify,
							value:row.id,
							active:false
						}
					})
					this.to_active(this.class_list[0]);
				})
			},
			to_active(item){
				this.class_list.forEach(row=>row.active=false)
				item.active=true;
				this.get_list(item.value)
			},
			to_page(item){
				if(item.path){
					uni.navigateTo({
						url:item.path
					})
				}else{
					this.$message('敬请期待','none')
				}
			},
			to_detail(item){
				uni.navigateTo({
					url:`/pages/good-detail/good-detail?id=${item.id}`
				})
			},
			to_search(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			scroll({target}){
				const {scrollTop} = target;
				this.scrollTop=scrollTop;
			}
		},
		components:{
			uiHeader
		}
	}
</script>

<style lang='less' scoped>
	.header{
		width: 750rpx;
		height: 278rpx;
		/* background-image: linear-gradient(to bottom,#fb7299,rgba(251,114,153,0.5),#fb7299); */
		/* background: #fb7299; */
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
		height: 330rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 0 auto;
		display: block;
		margin-top: -460rpx;
		image{
			height: 100%;
			width: 100%;
			border-radius: 10rpx;
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
		margin: 10px auto;
		padding: 0 35rpx;
		font-size: 28rpx;
		white-space: nowrap;
		line-height: 60rpx;
		/* margin-bottom: 20rpx; */
		view+view{
			margin-left: 35rpx;
		}
		.active{
			position: relative;
			color: #fb7299;
			&::after{
				content: '';
				width: 100%;
				height: 4rpx;
				background: #fb7299;
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
		padding-left:20rpx;
		box-sizing: border-box;
		/* column-count: 2;
		column-gap: 20rpx; */
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
				/* overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap; */
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
	.hot{
		padding: 0 30rpx;
		box-sizing: border-box;
		line-height: 80rpx;
		font-size: 26rpx;
		color: #fb7299;
	}
	.advert{
		width: 710rpx;
		margin: 0 auto;
		display: block;
		margin-top: 20rpx;
		height: 250rpx;
		background-size: 110% 100%;
		background-position: -35rpx;
		border-radius: 6rpx;
	}
</style>
