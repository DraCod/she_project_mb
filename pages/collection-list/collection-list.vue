<template>
	<view>
		<view 
			class="collection-item" 
			v-for="(item,index) in list" 
			:key="index"
			@click="to_detail(item)">
			<image :src="url+item.good.main.path" mode=""></image>
			<view class="good-info">
				<view class="title">
					{{item.good.goods}}
				</view>
				<view class="price">
					¥{{item.good.price}}
				</view>
			</view>
			<view class="delete" @click.stop="remove(item)">
				删除
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				url:''
			};
		},
		mounted(){
			this.url = this.$url
			this.get_lsit();
		},
		methods:{
			get_lsit(){
				this.$http('get|mb/collection-list').then(res=>{
					this.list = res.data;
				})
			},
			to_detail(item){
				uni.navigateTo({
					url:`/pages/good-detail/good-detail?id=${item.good.id}`
				})
			},
			remove(item){
				this.$http('post|mb/remove-collection',{
					id:item.good.id
				}).then(res=>{
					this.$message(res.msg);
					setTimeout(()=>{
						this.get_lsit();
					},2000)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.collection-item{
		height: 220rpx;
		margin-top: 20rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: flex-end;
		background-color: #fff;
		image{
			height: 180rpx;
			width: 180rpx;
		}
		.good-info{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			height: 100%;
			padding-left: 30rpx;
			box-sizing: border-box;
		}
		.title{
			font-size: 32rpx;
		}
		.price{
			font-size: 24rpx;
			color: #FF0131;
		}
		.delete{
			font-size: 24rpx;
		}
	}
</style>
