<template>
	<view>
		<view class="option">
			<view 
				:class="[item.active?'active':'','item']"
				v-for="(item,index) in option"
				:key='index'
				@click="to_active(item,$event)">
				{{item.label}}
			</view>
		</view>
		<view 
			class="order-item" 
			v-for="(item,index) in list" 
			:key='index'
			@click="to_detail(item)">
			<view class="order-header">
				<view class="">
					订单号：{{item.orderNum}}
				</view>
				<view :class="[item.status==1?'red':'']">
					{{item.status|filter}}
				</view>
			</view>
			<view class="good-list">
				<view class="item" v-for="(ite,ind) in item.goodList" :key='ind'>
					<image :src="url+ite.path" mode=""></image>
					<view class="item-content">
						<view class="ellipsis-two">
							{{ite.goods}}
						</view>
						<view class="">
							¥{{ite.price}}
						</view>
					</view>
					<view class="">
						x{{ite.num}}
					</view>
				</view>
			</view>
			<view class="order-info">
				<view class="">
					共{{item.goodList.length}}件商品
				</view>
				<view class="">
					运费：¥0
				</view>
				<view class="">
					总价：¥{{item.price}}
				</view>
			</view>
			<view class="order-option">
				<view class="cancel-order" v-if="item.status==1">
					取消订单
				</view>
				<view class="pay" v-if="item.status==1" @click.stop="to_pay(item)">
					立即付款
				</view>
				<view class="take" v-if="item.status==3" @click.stop="edit_change(item,4)">
					确认收货
				</view>
				<view class="take" v-if="item.status==4" @click.stop="to_comment(item)">
					现在评论
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option:[
					{
						label:'全部',
						value:'',
						active:true
					},
					{
						label:'待付款',
						value:1,
						active:false
					},
					{
						label:'待发货',
						value:2,
						active:false
					},
					{
						label:'待收货',
						value:3,
						active:false
					},
					{
						label:'待评论',
						value:4,
						active:false
					}
				],
				// left:0,
				status:'',
				list:[],
				url:''
			}
		},
		onLoad({status}){
			this.url = this.$url;
			this.status = status;
			this.option.forEach(el=>el.active=false);
			let find = this.option.find(ro=>ro.value==status)
			find.active = true;
		},
		onShow() {
			this.get_list();
		},
		methods: {
			to_pay(item){
				uni.navigateTo({
					url:`/pages/order-detail/order-detail?id=${item.id}&type=pay`
				})
			},
			to_detail(item){
				uni.navigateTo({
					url:`/pages/order-detail/order-detail?id=${item.id}`
				})
			},
			to_comment(item){
				uni.navigateTo({
					url:`/pages/comment/comment?id=${item.id}`
				})
			},
			edit_change(item,status){
				this.$http('post|mb/edit-order',{
					id:item.id,
					status
				}).then(res=>{
					this.$message(res.msg);
					setTimeout(()=>{
						this.get_list();
					},2000)
				})
			},
			to_active(item,e){
				// this.left = e.target.offsetLeft;
				this.status = item.value;
				this.option.forEach(el=>el.active=false);
				item.active=true;
				this.get_list();
			},
			get_list(){
				this.$http('get|mb/order-list',{
					status:this.status
				}).then(res=>{
					this.list = res.data;
				})
			}
		},
		filters:{
			filter(val){
				switch(val){
					case 1:
						return '待付款'
					case 2:
						return '待发货'
					case 3:
						return '待收货'
					case 4:
						return '待评论'
					case 5:
						return '交易完成'
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.option{
		display: flex;
		height: 90rpx;
		background-color: #FFFFFF;
		position: relative;
		.item{
			flex: 1;
			line-height: 90rpx;
			text-align: center;
		}
		.active{
			position: relative;
			&::after{
				width: 100rpx;
				height: 2px;
				background-color: #fb7299;
				position: absolute;
				bottom: 0;
				left: 50%;
				margin-left: -50rpx;
				content: '';
			}
		}
		.hover{
			width: 100rpx;
			height: 2px;
			background-color: #fb7299;
			position: absolute;
			bottom: 0;
			transition: all 0.3s;
		}
	}
	.order-item{
		margin-top: 20rpx;
		background-color: #fff;
		.order-header{
			height: 80rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			align-items: center;
		}
		.good-list{
			position: relative;
			padding: 30rpx;
			box-sizing: border-box;
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
			.item{
				display: flex;
				&+.item{
					margin-top: 30rpx;
				}
				.item-content{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					margin: 0 30rpx;
				}
				image{
					height: 200rpx;
					width: 200rpx;
				}
			}
		}
		.order-info{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			height: 80rpx;
			padding: 0 30rpx;
			position: relative;
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
		}
		.order-option{
			padding: 10px 0px 10px 15px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 28rpx;
			box-sizing: border-box;
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
	}
	.red{
		color: #FF0131;
	}
</style>
