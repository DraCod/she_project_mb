<template>
	<view>
		<button open-type="getUserInfo" class="getinfo" @getuserinfo="bindGetUserInfo">
			<view class="user-box">
				<image class="avator" :src="getUser.avatarUrl||user" mode=""></image>
				<view class="">
					<view class="name">
						{{getUser.userName||'未登录'}}
						<view class="iconfont icon-VIP" v-if="getUser.userName"></view>
					</view>
					<view class="small">
						杂货店用户名：{{getUser.otherName||''}}
					</view>
				</view>
			</view>
		</button>
		<view class="my-wallet" @click="to_walletdetail">
			<view class="flex order-title">
				<view class="title">
					我的钱包
				</view>
				<view class="iconfont icon-arrow-r">
					余额：{{(getUser.giveWallet+getUser.rechargeWallet)||0}}
				</view>
			</view>
			<view class="wallet-item">
				<view class="">
					<view class="">
						赠送金额
					</view>
					<view class="">
						{{getUser.giveWallet||0}}
					</view>
				</view>
				<view class="">
					<view class="">
						充值金额
					</view>
					<view class="">
						{{getUser.rechargeWallet||0}}
					</view>
				</view>
			</view>
		</view>
		<view class="order-list">
			<view class="flex order-title" @click="to_order('')">
				<view class="title">
					我的订单
				</view>
				<view class="iconfont icon-arrow-r">
					全部订单
				</view>
			</view>
			<view class="order-status">
				<view class="" @click="to_order(1)">
					<image :src="padding_pay" mode=""></image>
					<view class="text">
						待付款
					</view>
					<view class="icon" v-if="address_status.await_pay">
						{{address_status.await_pay}}
					</view>
				</view>
				<view class="" @click="to_order(2)">
					<image :src="padding_ship" mode=""></image>
					<view class="text">
						待发货
					</view>
					<view class="icon" v-if="address_status.await_transport">
						{{address_status.await_transport}}
					</view>
				</view>
				<view class="" @click="to_order(3)">
					<image :src="padding_card" mode=""></image>
					<view class="text">
						待收货
					</view>
					<view class="icon" v-if="address_status.await_take">
						{{address_status.await_take}}
					</view>
				</view>
				<view class="" @click="to_order(4)">
					<image :src="padding_evaluation" mode=""></image>
					<view class="text">
						待评价
					</view>
					<view class="icon" v-if="address_status.await_evaluation">
						{{address_status.await_evaluation}}
					</view>
				</view>
				<view class="">
					<image :src="after_sale" mode=""></image>
					<view class="text">
						退款/售后
					</view>
				</view>
			</view>
		</view>
		
		<view class="service">
			<view class="title">
				常用服务
			</view>
			<view class="service-content">
				<view class="content-item">
					<view class="" @click="to_walletdetail">
						<image :src="icon4" mode=""></image>
						<view class="">
							我的钱包
						</view>
					</view>
					<view class="" @click="to_address">
						<image :src="icon7" mode=""></image>
						<view class="">
							地址管理
						</view>
					</view>
					<view class="" @click="to_collection">
						<image :src="icon9" mode=""></image>
						<view class="">
							收藏
						</view>
					</view>
					<view @click="to_seting">
						<image :src="seting" mode=""></image>
						<view class="">
							设置
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <wallect v-model="dialog"></wallect> -->
	</view>
</template>

<script>
	import back from '../../assets/my_back.png';
	import padding_pay from '../../assets/padding_pay.png'
	import padding_ship from '../../assets/padding_ship.png'
	import padding_card from '../../assets/padding_card.png'
	import padding_evaluation from '../../assets/padding_evaluation.png'
	import after_sale from '../../assets/after_sale.png'
	import user from '../../assets/user.jpeg';
	import icon4 from '../../assets/icon_4.png'
	import icon7 from '../../assets/icon_7.png'
	import icon9 from '../../assets/icon_9.png'
	import seting from '../../assets/seting.png'
	import wallect from '../../components/wallect.vue'
	export default {
		data() {
			return {
				test:'123',
				back,
				padding_pay,
				padding_ship,
				padding_card,
				padding_evaluation,
				after_sale,
				icon4,
				icon7,
				icon9,
				seting,
				user,
				userinfo:false,
				address_status:{}
			};
		},
		async mounted(){
			await this.get_user_info();
		},
		onShow(){
			if(this.userinfo){
				this.get_status();
				this.get_userinfo();
			}
		},
		methods: {
			to_seting(){
				uni.navigateTo({
					url:`/pages/seting/seting`
				})
			},
			to_address(){
				uni.navigateTo({
					url:`/pages/address_list/address_list`
				})
			},
			to_collection(){
				uni.navigateTo({
					url:`/pages/collection-list/collection-list`
				})
			},
			to_walletdetail(){
				uni.navigateTo({
					url:`/pages/wallet-list/wallet-list`
				})
			},
			get_status(){
				this.$http('get|mb/order-status').then(res=>{
					this.address_status=res.data;
				})
			},
			get_userinfo(){
				this.$http('get|mb/get-user-info').then(res=>{
					this.$store.dispatch('setUser',res);
				})
			},
			to_order(status){
				uni.navigateTo({
					url:`/pages/order-list/order-list?status=${status}`
				})
			},
			bindGetUserInfo() {
				this.get_user_info();
			},
			async get_user_info(){
				uni.getSetting({
					success:res=> {
						if(res.authSetting['scope.userInfo']){
							uni.showLoading({
								title:'正在加载'
							})
							uni.login({
								success: res => {
									if (res.code) {
										let code = res.code;
										uni.getUserInfo({
											success:async res => {
												await this.$http('post|mb/login',{
													code,
													encryptedData: res.encryptedData,
													iv: res.iv
												}).then(async res=>{
													await this.$save('token',res.token);
													this.$store.dispatch('setUser',res.data);
													this.userinfo=true;
													this.get_status();
													this.get_userinfo();
												})
											},
											fail: err => {
												uni.showToast({
													title: '授权失败',
													icon: 'none'
												});
											}
										});
									}
								}
							});
						}
					}
				})
			}
		},
		computed:{
			getUser(){
				return this.$store.getters.getUser
			}
		},
		components:{
			wallect
		}
	};
</script>

<style lang="less" scoped>
	.getinfo{
		margin: 0;
		padding: 0;
		border-radius: 0px;
		border: none;
		box-shadow: none;
		&::after{
			content: none;
		}
	}
	.user-box{
		height: 210rpx;
		background: #fb7299;
		// background-image: linear-gradient(to bottom,#fb7299,rgba(251,114,153,0.5),#fb7299);
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		>view{
			margin-left: 20rpx;
			color: #fff;
		}
		.avator{
			height: 120rpx;
			width: 120rpx;
			border-radius: 50%;
		}
		.name{
			font-size: 40rpx;
			line-height: 60rpx;
			text-align: left;
			.icon-VIP{
				display: inline;
				font-size: 24rpx;
				color: #f4ea2a;
				margin-left: 20rpx;
			}
		}
		.small{
			font-size: 24rpx;
			line-height: 24rpx;
			text-align: left;
		}
	}
	.order-list,.my-wallet{
		width: 710rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: 6rpx;
		padding: 20rpx;
		box-sizing: border-box;
		.flex{
			display: flex;
			justify-content: space-between;
		}
		.order-title,{
			font-size: 26rpx;
			border-bottom: 2rpx solid #ededed;
			padding-bottom: 10px;
			.title{
				font-size: 30rpx;
			}
			.icon-arrow-r{
				color: #b0b0b0;
				font-size: 26rpx;
			}
		}
		.order-status{
			display: flex;
			justify-content: space-between;
			margin-top: 28rpx;
			>view{
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
			}
			.icon{
				position: absolute;
				font-size: 24rpx;
				transform: scale(0.9);
				height: 26rpx;
				width: 26rpx;
				background-color: #FF0131;
				color: #fff;
				border-radius: 50%;
				right: 0;
				top: 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			image{
				height: 44rpx;
				width: 44rpx;
			}
			.text{
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
	.address{
		margin-top: 20rpx;
	}
	.setting,.address{
		font-size: 26rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		&::after{
			content: '';
			position: absolute;
			width: calc(100% - 60rpx);
			left: 50%;
			transform: translateX(-50%) scaleY(0.5);
			height: 2rpx;
			background-color: #ccc;
			bottom: 0;
		}
		&:active{
			background-color: #fb7299;
			color: #fff;
		}
	}
	
	.service{
		padding: 0 30rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		width: 710rpx;
		margin: 0 auto;
		background-color: #fff;
		margin-top: 20rpx;
		.title{
			line-height: 90rpx;
			font-size: 30rpx;
			border-bottom: 2rpx solid #ededed;
		}
		.service-content{
			padding: 30rpx 0;
			.content-item{
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				>view{
					width: 100rpx;
					text-align: center;
				}
				image{
					height: 60rpx;
					width: 60rpx;
				}
			}
		}
	}
	.wallet-item{
		color: #b0b0b0;
		display: flex;
		font-size: 26rpx;
		padding: 30rpx 0 ;
		>view{
			flex: 1;
			text-align: center;
		}
	}
</style>
