<template>
	<view class="wallet-list">
		<view class="card">
			<view class="title">
				钱包余额
			</view>
			<view class="count">
				¥{{count}}
			</view>
		</view>
		<view class="option">
			<view 
				v-for="(item,index) in option" 
				:class="[type==item.value?'active':'']"
				:key='index'
				@click="to_active(item)">
				{{item.label}}
			</view>
		</view>
		<view class="list">
			<view 
				class="list-item" 
				v-for="(item,index) in list" 
				:key="index">
				<view class="info">
					<view class="">
						{{item.content}}
					</view>
					<view class="time">
						{{item.createdAt|fileTime}}
					</view>
				</view>
				<view :class="[item.type==1?'red':'']">
					{{item.type==1?'+':'-'}}{{item.num}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:0,
				option:[
					{
						label:'全部',
						value:'',
					},
					{
						label:'收入',
						value:1
					},
					{
						label:'支出',
						value:2
					}
				],
				type:'',
				list:[]
			};
		},
		onShow() {
			this.get_list();
		},
		methods:{
			to_active(item){
				this.type = item.value;
				this.get_list();
			},
			get_list(){
				this.$http('get|mb/wallet-list',{
					type:this.type
				}).then(res=>{
					this.count = res.user.rechargeWallet+res.user.giveWallet
					this.list = res.data
				})
			}
		},
		filters:{
			fileTime(val){
				return new Date(val).toLocaleString()
			}
		}
	}
</script>

<style lang="less">
	.wallet-list{
		.card{
			height: 150rpx;
			background-color: #fb7299;
			padding: 30rpx;
			color: #FFFFFF;
			text-align: center;
			.title{
				font-size: 26rpx;
				color: rgba(255,255,255,0.8);
			}
			.count{
				font-size: 59rpx;
				display: inline;
			}
		}
		.option{
			display: flex;
			background-color: #fff;
			>view{
				flex: 1;
				text-align: center;
				line-height: 100rpx;
				font-size: 26rpx;
				&.active{
					color: #fb7299;
				}
			}
		}
		.list{
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			.list-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				height: 120rpx;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				font-size: 24rpx;
				.time{
					color: #ccc;
				}
				.info{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				.red{
					color: #FF0131;
				}
			}
		}
	}
</style>
