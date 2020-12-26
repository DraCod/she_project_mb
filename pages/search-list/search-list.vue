<template>
	<view>
		<view class="header-box">
			<view class="header-input" @click="back">
				{{search}}
			</view>
		</view>
		<view class="search-option">
			<view 
				:class="[search_option[0].active?'active':'']" 
				@click="to_active(search_option[0],0)">
				综合
			</view>
			<view 
				:class="[search_option[1].active?'active':'','flex']"  
				@click="to_active(search_option[1],1)">
				销量
				<view :class="['iconfont icon-arrow-r',search_option[1].sort=='ASC'?'asc':'']"></view>
			</view>
			<view 
				:class="[search_option[2].active?'active':'','flex']"  
				@click="to_active(search_option[2],2)">
				价格
				<view :class="['iconfont icon-arrow-r',search_option[2].sort=='ASC'?'asc':'']"></view>
			</view>
			<view 
				:class="[search_option[3].active?'active':'']"  
				@click="to_active(search_option[3],3)">
				新品
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'',
				search_option:[
					{
						active:true,
						value:'id',
						sort:''
					},
					{
						active:false,
						value:'buy',
						sort:'ASC',//ASC
					},
					{
						active:false,
						value:'price',
						sort:'ASC',//DESC
					},
					{
						active:false,
						value:'created_at',
						sort:''
					}
				],
				index:0,
				list:[],
				url:''
			};
		},
		onLoad({search}){
			this.search = search;
			this.url=this.$url;	
			this.get_list();
			uni.setNavigationBarTitle({
				title:this.search
			})
		},
		methods:{
			get_list(){
				let find = this.search_option.find(ro=>ro.active)
				let data={
					search:this.search,
					order:find.value,
					way:find.sort
				}
				this.$http('get|mb/search-list',data).then(res=>{
					this.list = res.data;
				})
			},
			to_active(item,index){
				if(index!=this.index){
					this.search_option.forEach(ro=>ro.active=false)
				}
				item.active = true;
				if(item.sort == 'ASC'){
					item.sort = 'DESC'
				}else{
					item.sort = 'ASC'
				}
				if(index!=this.index){
					if(this.search_option[this.index].sort){
						this.search_option[this.index].sort='ASC'
					}
				}
				this.index = index;
				this.get_list();
			},
			back(){
				uni.navigateBack()
			},
			to_detail(item){
				uni.navigateTo({
					url:`/pages/good-detail/good-detail?id=${item.id}`
				})
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
	.header-box{
		background-color: #fb7299;
		padding: 20rpx 0;
		.header-input{
			width: 690rpx;
			height: 60rpx;
			background: #f7f7f7;
			border-radius: 28rpx;
			opacity: .9;
			margin: 0 auto 0 auto;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 30rpx;
			box-sizing: border-box;
			font-size: 26rpx;
			color: #343434;
		}
	}
	.search-option{
		display: flex;
		>view{
			flex: 1;
			height: 90rpx;
			color: #343434;
			display: flex;
			justify-content: center;
			align-items: center;
			&.active{
				color: #fb7299;
				.icon-arrow-r{
					visibility: visible;
				}
			}
			.icon-arrow-r{
				transform: rotateZ(90deg);
				font-size: 24rpx;
				visibility: hidden;
				transition: transform  .3s;
				&.asc{
					transform: rotate(270deg);
				}
			}
		}
		.flex{
			
		}
	}
	.good-list{
			padding-left: 20rpx;
			box-sizing: border-box;
			overflow: hidden;
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
