<template>
	<view>
		<view class="search">
			<view class="input-box">
				<view class="iconfont icon-sousuo"></view>
				<input type="text" v-model="search" @confirm="to_search" placeholder="输入商品名称"/>
				<view class="icon-guanbi iconfont" @click="remove"></view>
			</view>
			<view class="button" @click="to_search">
				搜索
			</view>
		</view>
		<view class="history">
			<view class="flex">
				<view class="">
					历史记录
				</view>
				<view class="" @click="remove_list">
					删除
				</view>
			</view>
			<view class="history-list">
				<view v-for="(item,index) in list" @click="is_search(item)" :key="index">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'',
				list:[],
			};
		},
		onShow(){
			this.list = this.$get('history')||[]
		},
		methods:{
			remove(){
				this.search = ''
			},
			remove_list(){
				this.list = [];
				this.$save('history',[])
			},
			to_search(){
				if(this.search ==''){
					return
				}
				let history = this.$get('history')||[]
				if(this.list.length>=5){
					this.list.splice(4,1)
					history.splice(4,1)
				}
				let find = this.list.findIndex(ro=>ro==this.search);
				if(find!=-1){
					history.splice(find,1)
					this.list.splice(find,1)
				}
				history.unshift(this.search);
				this.list.unshift(this.search);
				this.$save('history',history);
				uni.navigateTo({
					url:`/pages/search-list/search-list?search=${this.search}`
				})
			},
			is_search(item){
				this.search = item
				this.to_search()
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
</style>

<style lang="less" scoped>
	.search{
		padding: 14rpx 30rpx;
		background-color: #fb7299;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.input-box{
			width: 610rpx;
			position: relative;
			input{
				background-color: #f7f7f7;
				height: 60rpx;
				border-radius: 30rpx;
				padding: 0 80rpx;
				box-sizing: border-box;
				font-size: 26rpx;
			}
			.icon-sousuo{
				position: absolute;
				left: 30rpx;
				top: 50%;
				transform: translateY(-50%);
			}
			.icon-guanbi{
				position: absolute;
				right: 30rpx;
				font-size: 32rpx;
				top: 50%;
				transform: translateY(-50%);
			}
			.iconfont{
				color: #ccc;
			}
		}
		.button{
			font-size: 30rpx;
			color: #fff;
		}
	}
	.history{
		margin-top: 50rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		.flex{
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			color: #454545;
		}
		.history-list{
			padding-left: 30rpx;
			overflow: hidden;
			view{
				padding: 0 20rpx;
				line-height: 50rpx;
				background-color:#F7F7F7 ;
				color: #666;
				float: left;
				margin-top: 24rpx;
				margin-right: 30rpx;
				font-size: 26rpx;
			}
		}
	}
</style>
