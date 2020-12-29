<template>
	<view class="order-page">
		<view class="address-box" @click="to_address">
			<image :src="addressImg" mode=""></image>
			<view class="address-content">
				<view class="flex">
					<view class="">
						收货人:{{address.consignee}}
					</view>
					<view class="">
						{{address.tel}}
					</view>
				</view>
				<view class="address">
					{{address.allAddress}}
				</view>
			</view>
			<view class="icon-arrow-r iconfont">
			</view>
		</view>
		<image :src="addressLine" class="page-line" mode=""></image>
		<view class="pro-section">
			<view class="good-item" v-for="(item,index) in good_list" :key="index">
				<image :src="url+item.path" mode=""></image>
				<view class="good-content">
					<view class="title">
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
		<view class="page-mark">
			<view class="">
				备注信息：
			</view>
			<input type="text" v-model="remarks" placeholder="备注信息"/>
		</view>
		<view class="order-info">
			<view class="">
				<view class="">
					商品总价：
				</view>
				<view class="black">
					¥{{info.price}}
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
					¥{{info.price}}
				</view>
			</view>
		</view>
		<view class="page-bot">
			<view class="text">
				总价：
				<view class="red">
					¥{{info.price}}
				</view>
			</view>
			<view class="button" @click="to_create">
				去结算
			</view>
		</view>
		<wallect v-model="dialog" @colse="close" :order_id='order_id' @type="to_pay"></wallect>
		<password 
			@check_word="check_word" 
			@colse="close" 
			v-model="password_dialog"
			:pay_price="info.price"
			:change='change'></password>
	</view>
</template>

<script>
	import addressImg from '../../assets/adress.png'
	import addressLine from '../../assets/icon_1.png'
	import wallect from '../../components/wallect.vue'
	import password from '../../components/password.vue'
	export default {
		data() {
			return {
				addressImg,//地址图标
				addressLine,//红线
				good:'',
				good_list:[],
				address:{},
				url:'',
				remarks:'',
				info:{},
				addressId:'',
				remove:false,
				dialog:false,
				order_id:'',
				type:'',
				password_dialog:false,
				change:0
			};
		},
		onLoad(query){
			this.good = JSON.parse(query.good);
			this.url = this.$url
			if(query.type){
				this.remove=true
			}
			this.get_info();
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
							this.close();
						},3000)
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
				uni.redirectTo({
					url:'/pages/order-list/order-list?status='
				})
			},
			to_pay(type){
				this.type=type;
				this.password_dialog = true;
			},
			to_create(){
				this.$http('post|mb/create-order',{
					addressId:this.addressId||this.address.id,
					goodList:this.good,
					remarks:this.remarks,
				}).then(res=>{
					if(this.remove){
						let car = this.getCar;
						this.good.forEach(row=>{
							let find = car.findIndex(ro=>ro.id==row.id);
							car.splice(find,1);
						})
						this.$store.dispatch('setCar',car);
					}
					this.dialog=true;
					this.order_id = res.data.id;
				})
			},
			// init(){
			// 	uni.redirectTo({
			// 		url:'/pages/order-list/order-list?status='
			// 	})
			// },
			to_address(){
				uni.navigateTo({
					url:'/pages/address_list/address_list?type=1'
				})
			},
			get_info(){
				this.$http('post|mb/preview-order',{
					goodList:this.good,
					addressId:this.addressId
				}).then(res=>{
					this.good_list = res.goodList
					this.address=res.address;
					this.info = res.info
				}).catch(err=>{
					uni.showModal({
					    title:'提示',
					    content:err.msg,
					    success:(res)=> {
					        uni.navigateBack()
					    }
					});
				})
			}
		},
		computed:{
			getAddress(){
				return this.$store.getters.getAddress
			},
			getCar(){
				return this.$store.getters.getShopCar;
			},
		},
		watch:{
			getAddress(val){
				this.addressId = val;
				this.get_info();
			}
		},
		components:{
			wallect,
			password
		}
	}
</script>

<style lang="less" scoped>
	.order-page{
		padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
		// padding-bottom: constant(safe-area-inset-bottom);
		// padding-bottom: env(safe-area-inset-bottom);
	}
	.page-bot{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		box-shadow: 0 0 32rpx 0 rgba(0,0,0,.06);
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		.text{
			display: flex;
			padding: 0 30rpx;
		}
		.button{
			width: 250rpx;
			background-color: #fb7299;
			color: #fff;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	}
	.address-box{
		min-height: 190rpx;
		background: #fff;
		padding: 0 30rpx;
		font-size: 32rpx;
		color: #353535;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		image{
			height: 44rpx;
			width: 44rpx;
		}
		.address-content{
			flex: 1;
			font-size: 32rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			.flex{
				display: flex;
				justify-content: space-between;
			}
			.address{
				font-size: 26rpx;
				color: #999;
				margin-top: 16rpx;
				line-height: 32rpx;
			}
		}
	}
	.page-line{
		width: 100%;
		height: 8rpx;
		display: block;
	}
	.pro-section{
		background: #fff;
		margin: 20rpx 0;
		.good-item{
			padding: 20rpx 30rpx;
			display: flex;
			align-items: stretch;
			image{
				height: 200rpx;
				width: 200rpx;
			}
			.good-content{
				font-size: 28rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin: 0 20rpx;
				// height: 200rpx;
				.title{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
	.page-mark{
		height: 100rpx;
		background: #fff;
		padding: 0 30rpx;
		font-size: 30rpx;
		color: #333;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		input{
			text-align: right;
		}
	}
	.order-info{
		background: #fff;
		padding: 30rpx;
		margin-top: 20rpx;
		font-size: 30rpx;
		color: #666;
		>view{
			margin-bottom: 26rpx;
			display: flex;
			justify-content: space-between;
			&:last-child{
				margin-bottom: 0;
			}
		}
		.black{
			color: #333;
		}
	}
	.red{
		color:#FF0131
	}
</style>
