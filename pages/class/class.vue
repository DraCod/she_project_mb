<template>
	<view class="class">
		<view class="left">
			<view 
				v-for="(item,index) in class_list" 
				:class="[item.active?'active':'']"
				:key="index"
				@click="to_active(item)">
				{{item.label}}
			</view>
		</view>
		<view class="right">
			<view class="class-title">
				<view class="title">
					{{class_title}}
				</view>
			</view>
			<view class="good-list">
				<view class="good-item" v-for="(item,index) in list" :key='index' @click="to_detail(item)">
					<image :src="url+item.main.path" mode="aspectFill"></image>
					<view class="title">
						{{item.goods}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				class_list:[],
				class_title:'',
				list:[],
				url:''
			};
		},
		mounted(){
			this.url=this.$url;
			this.get_classify();
		},
		methods:{
			get_classify(){
				this.$http('get|pc/classify-list').then(res=>{
					this.class_list = res.data.map(row=>{
						return{
							label:row.classify,
							value:row.id,
							active:false
						}
					})
					this.to_active(this.class_list[0]);
				})
			},
			to_active(item){
				this.class_list.forEach(row=>row.active=false)
				item.active=true;
				this.get_list(item.value);
				this.class_title=item.label;
			},
			get_list(id){
				this.$http('get|pc/good-list',{
					classify:id
				}).then(res=>{
					this.list=res.data;
				})
			},
			to_detail(item){
				uni.navigateTo({
					url:`/pages/good-detail/good-detail?id=${item.id}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.class{
		display: flex;
		height: 100vh;
		.left{
			width: 200rpx;
			position: relative;
			font-size: 30rpx;
			>view{
				height: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				&.active{
					background-color: rgba(251,114,153,0.5);
					color: #fff;
				}
			}
			&::after{
				position: absolute;
				content: '';
				height: 100%;
				background-color: #fb7299;
				width: 2rpx;
				left: 199rpx;
				transform: scaleX(.5);
				top: 0;
			}
		}
		.right{
			flex: 1;
			padding: 0 20rpx;
			box-sizing:border-box;
			.class-title{
				margin: 30rpx 0;
				height: 1rpx;
				background-color: #D8DBE5;
				position: relative;
				.title{
					color: #A1A1A1;
					font-size: 26rpx;
					background-color: #F7F7F7;
					padding: 0 10rpx;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
			.good-list{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-content:flex-start
			}
			.good-item{
				width: 250rpx;
				margin-bottom: 20rpx;
				image{
					height: 250rpx;
					width: 250rpx;
				}
				.title{
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					font-size: 26rpx;
					margin-top: 10rpx;
				}
			}
		}
		.left,.right{
			overflow: auto;
		}
	}
</style>
