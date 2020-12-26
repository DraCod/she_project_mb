<template>
	<view class="shop-car">
		<view class="car-box">
			<template v-if="car_list.length>0">
				<view class="good-list-item" v-for="(item,index) in car_list" :key='index'>
					<checkbox :checked="item.check" @click="item_change(item)" color="#fb7299"/>
					<image :src="item.url" mode="aspectFill"></image>
					<view class="good-info">
						<view class="">
							{{item.goods}}
						</view>
						<view class="price-box">
							<view class="price-title">
								¥
								<view class="price">
									{{item.price}}
								</view>
							</view>
							<view class="computed">
								<view class="iconfont icon-open" @click="reduce(item)"></view>
								<view class="num">
									{{item.num}}
								</view>
								<view class="iconfont icon-jia" @click="add(item)"></view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<view class="no-data" v-else>
				购物车为空
			</view>
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
		
		<view class="option">
			<view class="flex">
				<checkbox :checked="check" @click="all_click" color="#fb7299"/>
				<view class="check-text">
					全选
				</view>
				<view class="all-price flex">
					合计：
					<view class="price">
						{{price}}
					</view>
				</view>
			</view>
			<view class="button" @click="submit">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				check:false,
				car_list:[],
				timer:null,
				price:0,
				list:[],
				url:''
			};
		},
		mounted(){
			this.url = this.$url;
		},
		onShow(){
			this.car_list=[];
			this.getCar.forEach(row=>{
				this.car_list.push(Object.assign({},row))
			})
			this.computed_price();
			this.get_list();
		},
		methods:{
			get_list(){
				let data={
					search:'',
					order:'id',
					way:''
				}
				this.$http('get|mb/search-list',data).then(res=>{
					this.list = res.data;
				})
			},
			to_detail(item){
				uni.navigateTo({
					url:`/pages/good-detail/good-detail?id=${item.id}`
				})
			},
			submit(){
				let filter = this.car_list.filter(row=>row.check);
				console.log(filter);
				if(filter.length==0){
					this.$message("请先选择商品",'none')
				}else{
					this.to_preview(filter);
				}
			},
			to_preview(arr){
				let string = JSON.stringify(arr);
				uni.navigateTo({
					url:`/pages/order/order?good=${string}&type=1`
				})
			},
			computed_price(){
				this.price=0;
				let filter = this.car_list.filter(row=>row.check);
				filter.forEach(row=>{
					this.price+=(Number(row.price)*row.num)
				})
			},
			item_change(item){
				item.check = !item.check;
				this.computed_all_check()
				this.setCar();
			},
			computed_all_check(){
				if(this.car_list.length==0){
					this.check=false;
					return
				}
				let fil = this.car_list.filter(row=>!row.check);
				if(fil.length==0){
					this.check=true;
				}else{
					this.check=false;
				}
			},
			all_click(){
				this.check = ! this.check;
				this.car_list.forEach(ro=>ro.check=this.check);
				this.setCar();
			},
			reduce(item){
				if(item.num==1){
					let findIndex = this.car_list.findIndex(row=>row.id==item.id);
					this.car_list.splice(findIndex,1);
				}else{
					item.num--;
				}
				this.setCar();
				this.computed_all_check()
				// this.computed_price()
			},
			add(item){
				item.num++;
				this.setCar();
			},
			setCar(){
				clearTimeout(this.timer);
				this.computed_price();
				this.timer=setTimeout(()=>{
					this.$store.dispatch('setCar',this.car_list)
				},500)
			}
		},
		computed:{
			getCar(){
				return this.$store.getters.getShopCar;
			},
		},
	}
</script>

<style lang="less" scoped>
	.car-box{
		min-height: 450rpx;
	}
	.no-data{
		height: 450rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ccc;
	}
	.good-list-item{
		background-color: #fff;
		width: 700rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		height: 250rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto;
		margin-top: 20rpx;
		image{
			height: 200rpx;
			width: 200rpx;
		}
	}
	.good-info{
		width: 345rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 26rpx;
		height: 200rpx;
	}
	.price-box{
		display: flex;
		justify-content: space-between;
		>view{
			display: flex;
			align-items: center;
		}
		.price-title{
			font-size: 24rpx;
			align-items: baseline;
		}
		.price{
			font-size: 34rpx;
			color: #FF0131;
			margin-left: 10rpx;
		}
		.computed{
			font-size: 26rpx;
			border: 1rpx solid #ccc;
			border-radius: 6rpx;
			>view{
				width: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
			}
			.num{
				border-left:1rpx solid #ccc;
				border-right:1rpx solid #ccc;
			}
			.iconfont{
				font-size: 24rpx;
			}
		}
	}
	.shop-car{
		height: 100vh;
		padding-bottom: 100rpx;
		padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
		.option{
			background-color: #FFFFFF;
			height: 100rpx;
			width: 100%;
			position: fixed;
			bottom: 0;
			padding: 0 20rpx;
			width: calc(100% - 40rpx);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			.flex{
				display: flex;
				align-items: center;
			}
			.check-text{
				font-size: 24rpx;
				color: #D8DBE5;
			}
			.all-price{
				font-size: 24rpx;
				color: #666666;
				margin-left: 40rpx;
				.price{
					color: #FF0131;
					font-size: 34rpx;
				}
			}
		}
		.button{
			width: 178rpx;
			height: 72rpx;
			background: #fb7299;
			border-radius: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26rpx;
			color: #fff;
		}
	}
	.good-list{
		padding-left: 20rpx;
		box-sizing: border-box;
		overflow: hidden;
		margin-top: 30rpx;
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
