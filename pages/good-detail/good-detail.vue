<template>
	<view class="detail-page">
		<swiper :indicator-dots="true" :autoplay="true" class="swiper" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiper_list" :key='index'>
				<image :src="url+item.path" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="good-title">
			<view class="title">
				{{good.goods}}
			</view>
			<view class="price">
				¥
				<view class="price-num">
					{{good.price}}
				</view>
			</view>
		</view>
		<view class="comment">
			<view class="title" @click="to_detail">
				<view class="">
					用户评论
				</view>
				<view class="iconfont icon-arrow-r"></view>
			</view>
			<commit-item :item="good.comment" v-if="good.comment"></commit-item>
		</view>
		<view class="good-detail">
			<view class="detail-text">
				宝宝详情
			</view>
			<image :src="url+item.path" :key='index' v-for="(item,index) in good.detail" mode="widthFix"></image>
		</view>
		<view class="fixed">
			<view class="collection" @click="to_collection">
				<view :class="[collection?'active':'','iconfont icon-shoucang']"></view>
				<view class="">
					收藏
				</view>
			</view>
			<view class="add-card button" @click="addCar">
				添加购物车
			</view>
			<view class="buy button" @click="to_preview">
				立即下单
			</view>
		</view>
	</view>
</template>

<script>
	import commitItem from '../../components/comment-item.vue';
	export default {
		data() {
			return {
				swiper_list:[],
				url:'',
				good:{},
				id:'',
				collection:false
			};
		},
		onLoad({id}) {
			this.url = this.$url;
			this.id=id;
			this.$http('get|pc/good-detail',{
				id
			}).then(res=>{
				this.swiper_list = [res.main,...res.path];
				this.good = res;
				this.collection = res.collection;
			})
		},
		methods:{
			to_preview(){
				let arr=[
					{
						check:true,
						goods:this.good.goods,
						id:this.good.id,
						num:1,
						price:this.good.num,
						url:this.url+this.swiper_list[0].path
					}
				]
				let string = JSON.stringify(arr);
				uni.navigateTo({
					url:`/pages/order/order?good=${string}`
				})
			},
			addCar(){
				let car = this.get_car;
				let find = car.find(row=>row.id==this.good.id);
				if(find){
					find.num++;
					this.$store.dispatch('setCar',car);
				}else{
					this.$store.dispatch('addCar',{
						url:this.url+this.good.main.path,
						goods:this.good.goods,
						id:this.good.id,
						num:1,
						check:false,
						price:this.good.price
					})
				}
				this.$message('添加购物车成功')
			},
			to_detail(){
				uni.navigateTo({
					url:`/pages/comment-list/comment-list?id=${this.good.id}`
				})
			},
			to_collection(){
				if(this.collection){
					this.$http('post|mb/remove-collection',{
						id:this.id
					}).then(res=>{
						this.$message(res.msg);
						this.collection = false;
					})
				}else{
					this.$http('post|mb/add-collection',{
						id:this.id
					}).then(res=>{
						this.$message(res.msg);
						this.collection = true
					})
				}
			}
		},
		computed:{
			get_car(){
				return this.$store.getters.getShopCar;
			}
		},
		components:{
			commitItem
		}
	}
</script>

<style lang="less" scoped>
	.detail-page{
		padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
	}
	.swiper{
		height: 750rpx;
		image{
			height: 100%;
			width: 100%;
		}
	}
	.good-title{
		height: 160rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		.title{
			font-size: 30rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.price{
			font-size: 24rpx;
			display: flex;
			align-items: baseline;
			.price-num{
				margin-left: 10rpx;
				font-size: 34rpx;
				color: #FF0131;
			}
		}
	}
	.good-detail{
		margin-top: 10rpx;
		font-size: 0;
		.detail-text{
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			background-color: #fff;
			font-size: 30rpx;
		}
		image{
			width: 100%;
		}
	}
	
	.fixed{
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		width: 100%;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		border-top:1px solid #D8DBE5;
		.button{
			width: 290rpx;
			border-radius: 60rpx;
			height: 80rpx;
			background-color: #fb7299;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
			color: #fff;
		}
		.collection{
			width: 50rpx;
			text-align: center;
			font-size: 24rpx;
			.iconfont{
				font-size: 40rpx;
				color: #ccc;
				&.active{
					color: #fb7299;
				}
			}
		}
		.add-card{
			background-color: #FF7800;
		}
	}
	.comment{
		margin-top: 10rpx;
		.title{
			line-height: 80rpx;
			padding: 0 20rpx;
			font-size: 28rpx;
			box-sizing: border-box;
			background-color: #fff;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
		}
	}

</style>
