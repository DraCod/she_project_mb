<template>
	<view class="wallect-back" v-if="dialog">
		<view class="wallect" v-if="dialog">
			<view class="wallect-header">
				<view class="font">
					支付方式
				</view>
				<view class="iconfont icon-guanbi1" @click="close"></view>
			</view>
			<view class="list-item" @click="to_pay('giveWallet')">
				赠送余额：{{getUser.giveWallet}}
			</view>
			<view class="list-item" @click="to_pay('rechargeWallet')">
				充值余额：{{getUser.rechargeWallet}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			value:{},
			order_id:{},
		},
		data() {
			return {
				dialog:false
			};
		},
		methods:{
			close(){
				this.dialog = false;
				this.$emit('colse')
			},
			to_pay(type){
				this.$emit('type',type);
				this.dialog = false
				// this.$http('post|mb/order-pay',{
				// 	id:this.order_id,
				// 	type
				// }).then(res=>{
				// 	if(res.status==200){
				// 		this.$message(res.msg);
				// 		setTimeout(()=>{
				// 			this.$emit('init');
				// 			this.dialog = false;
				// 		},2000)
				// 	}else{
				// 		this.$message(res.msg)
				// 	}
				// })
			}
		},
		computed:{
			getUser(){
				return this.$store.getters.getUser
			}
		},
		watch:{
			value(val){
				this.dialog = val;
			},
			dialog(val){
				this.$emit('input',val)
			}
		}
	}
</script>

<style lang="less">
	.wallect-back{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0,0,0,0.5);
		.wallect{
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			width: 100%;
			animation: toShow .2s;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			.wallect-header{
				padding: 0 30rpx;
				box-sizing: border-box;
				width: 100%;
				display: flex;
				justify-content: space-between;
				height: 80rpx;
				align-items: center;
				.font{
					font-size: 28rpx;
				}
				.icon-guanbi1{
					font-size: 30rpx;
				}
			}
			.list-item{
				padding: 0 30rpx;
				line-height: 80rpx;
				font-size: 26rpx;
				border-top: 2rpx solid #ededed;
			}
		}
	}
	@keyframes move{
		form{
			transform: translateY(-100%);
		}
		to{
			transform: translateY(0);
		}
	}
</style>