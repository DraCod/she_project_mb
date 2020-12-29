<template>
	<view class="order-detail">
		<view class="header">
			<view class="">
				<view class="font-34">
					{{info.status|fliterTitle}}
				</view>
				<view class="font-26">
					{{info.status|filterMsg}}
				</view>
			</view>
			<view class="iconfont icon-daifukuan"></view>
		</view>
		<view class="address">
			<view class="icon-dizhi iconfont"></view>
			<view class="address-info">
				<view class="flex">
					<view class="">
						收货人：{{info.address.consignee}}
					</view>
					<view class="">
						{{info.address.tel}}
					</view>
				</view>
				<view class="all-address">
					收货地址：{{info.address.allAddress}}
				</view>
			</view>
		</view>
		<view class="good-list">
			<view class="order-num">
				订单编号：{{info.orderNum}}
			</view>
			<view class="good-item-box">
				<view class="good-item" v-for="(item,index) in info.goodList" :key='index'>
					<image :src="url+item.main.path" mode=""></image>
					<view class="info">
						<view class="ellipsis-two">
							{{item.goods}}
						</view>
						<view class="">
							¥{{item.price}}
						</view>
					</view>
					<view class="">
						x{{item.num}}
					</view>
				</view>
			</view>
		</view>
		<view class="order-info">
			<view class="">
				<view class="">
					商品总价：
				</view>
				<view class="">
					¥{{info.account}}
				</view>
			</view>
			<view class="">
				<view class="">
					运费：
				</view>
				<view class="red">
					+¥0
				</view>
			</view>
			<view class="">
				<view class="">
					优惠券：
				</view>
				<view class="red">
					-¥0
				</view>
			</view>
			<view class="">
				<view class="">
					应付金额：
				</view>
				<view class="red">
					¥{{info.account}}
				</view>
			</view>
		</view>
		<view class="remark">
			备注：{{info.remarks}}
		</view>
		<view class="order-time">
			下单时间：{{info.createdAt|flterTime}}
		</view>
		<view class="fixed" v-if="info.status==1||info.status==3">
			<view class="cancel-order" v-if="info.status==1">
				取消订单
			</view>
			<view class="pay" v-if="info.status==1" @click="is_pay">
				立即付款
			</view>
			<view class="take" v-if="info.status==3" @click="edit_change(4)">
				确认收货
			</view>
			<view class="take" v-if="info.status==4">
				现在评论
			</view>
		</view>
		<wallect v-model="dialog" :order_id="order_id" @type="to_pay"></wallect>
		<password 
			:change="change" 
			@check_word="check_word" 
			@colse="close" 
			:pay_price="info.account"
			v-model="password_dialog"></password>
	</view>
</template>

<script>
	import wallect from '../../components/wallect.vue'
	import password from '../../components/password.vue'
	export default {
		data() {
			return {
				order_id:'',
				info:{},
				url:'',
				dialog:false,
				password_dialog:false,
				type:'',
				change:0
			};
		},
		async onLoad({id,type}) {
			this.url = this.$url;
			this.order_id = Number(id);
			await this.get_detail()
			if(type){
				this.is_pay()
			}
		},
		methods:{
			check_word(password){
				this.$http('post|mb/order-pay',{
					id:this.order_id,
					type:this.type,
					password:password
				}).then(res=>{
					if(res.status==200){
						this.$message(res.msg);
						setTimeout(()=>{
							this.get_detail()
							this.password_dialog = false;
						},2000)
					}else{
						this.$message(err.msg,'none');
						this.change++;
					}
				}).catch(err=>{
					this.$message(err.msg,'none');
					this.change++;
				})
			},
			close(){
				this.password_dialog =false
			},
			to_pay(type){
				this.type=type;
				this.password_dialog = true;
			},
			is_pay(){
				this.dialog = true
			},
			async get_detail(){
				await this.$http('get|mb/order-detail',{
					id:this.order_id
				}).then(res=>{
					this.info = res.data;
				})
			},
			edit_change(status){
				this.$http('post|mb/edit-order',{
					id:this.order_id,
					status
				}).then(res=>{
					this.$message(res.msg);
					setTimeout(()=>{
						this.get_detail();
					},2000)
				})
			},
		},
		filters:{
			flterTime(val){
				return new Date(val).toLocaleString()
			},
			fliterTitle(val){
				switch(val){
					case 1:
						return '等待买家付款'
					case 2:
						return '等待卖家发货'
					case 3:
						return '等待买家收货'
					case 4:
						return '待评论'
					case 5:
						return '交易完成'
				}
			},
			filterMsg(val){
				switch(val){
					case 1:
						return '等你来接纳我'
					case 2:
						return '小儿正在努力包装'
					case 3:
						return '包裹在路上了'
					case 4:
						return '说说你的感想'
					case 5:
						return '购物愉快'
				}
			}
		},
		components:{
			wallect,
			password
		}
	}
</script>

<style lang="less" scoped>
	.header{
		height: 180rpx;
		padding: 40rpx 60rpx;
		background-color: #fb7299;
		box-sizing: border-box;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.font-34{
			font-size: 34rpx;
		}
		.font-26{
			font-size: 26rpx;
		}
		.iconfont{
			font-size: 100rpx;
			font-weight: 100;
		}
	}
	.order-detail{
		padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
	}
	.address{
		display: flex;
		height: 140rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		font-size: 30rpx;
		.icon-dizhi{
			font-size: 44rpx;
		}
		.address-info{
			flex: 1;
			padding-left: 24rpx;
		}
		.flex{
			display: flex;
			justify-content: space-between;
		}
		.all-address{
			font-size: 26rpx;
			color: #777;
			margin-top: 20rpx;
		}
	}
	.good-list{
		margin-top: 20rpx;
		background-color: #fff;
		.good-item-box{
			position: relative;
			padding: 20rpx 0;
			&::after{
				width: 100%;
				height: 2rpx;
				background-color: #dfe3e6;
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				transform: translateY(0.5);
			}
			&::before{
				width: 100%;
				height: 2rpx;
				background-color: #dfe3e6;
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				transform: translateY(0.5);
			}
		}
		.order-num{
			font-size: 28rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			height: 80rpx;
			line-height: 80rpx;
		}
		.good-item{
			padding: 0 30rpx;
			margin-bottom: 20rpx;
			display: flex;
			image{
				height: 200rpx;
				width: 200rpx;
			}
			.info{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 0 20rpx;
			}
		}
	}
	.order-info{
		background: #fff;
		padding: 30rpx;
		margin-top: 20rpx;
		font-size: 26rpx;
		color: #b3b3b3;
		>view{
			margin-bottom: 26rpx;
			display: flex;
			justify-content: space-between;
			&:last-child{
				margin-bottom: 0;
			}
		}
	}
	.order-time{
		height: 80rpx;
		padding: 0 30rpx;
		color: #9b9b9b;
		box-sizing: border-box;
		background-color: #FFFFFF;
		font-size: 26rpx;
		line-height: 80rpx;
	}
	.remark{
		padding: 20rpx 30rpx;
		color: #9b9b9b;
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		font-size: 26rpx;
		line-height: 30rpx;
	}
	.fixed{
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom); 
		font-size: 28rpx;
		>view{
			margin-right: 30rpx;
			border-radius: 8rpx;
			width: 170rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
		}
		.pay,.take{
			background-color: #fb7299;
			color: #fff;
		}
		.cancel-order{
			border: 1rpx solid #b4b4b4;
		}
	}
</style>
