<template>
	<view class="comment">
		<view 
			class="comment-item" 
			v-for="(item,index) in list" 
			:key='index'>
			<view class="good">
				<image :src="url+item.path" mode=""></image>
				<view class="title">
					{{item.goods}}
				</view>
			</view>
			<textarea class="textarea" v-model="item.content" placeholder="说说你的看法"/>
			<view class="start">
				星级：
				<view 
					:class="[ite.active?'active':'','iconfont icon-shoucang']" 
					v-for="(ite,ind) in item.start_arr" 
					:key='ind'
					@click="to_active(item.start_arr,ind)">
				</view>
			</view>
		</view>
		<view class="submit" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				url:'',
				id:'',
			};
		},
		onLoad({id}) {
			this.url = this.$url;
			this.id = id;
			this.info();
		},
		methods:{
			submit(){
				let list = this.list.map(ro=>{
					let find = ro.start_arr.findIndex(ro=>!ro.active)
					return{
						goodId:ro.id,
						content:ro.content,
						num:find==-1?5:find
					}
				})
				this.$http('post|mb/set-comment',{
					id:this.id,
					goodList:list
				}).then(res=>{
					this.$message(res.msg);
					setTimeout(()=>{
						uni.navigateBack()
					},2000)
				})
			},
			to_active(arr,index){
				arr.forEach(ro=>ro.active=false);
				for(let i=0;i<=index;i++){
					arr[i].active = true;
				}
			},
			info(){
				this.$http('get|mb/preview-comment',{
					order:this.id
				}).then(res=>{
					this.list = res.data.map(row=>{
						return{
							...row,
							content:'',
							start_arr:[
								{
									active:false,
								},
								{
									active:false,
								},
								{
									active:false,
								},
								{
									active:false,
								},
								{
									active:false,
								}
							]
						}
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.comment{
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		.comment-item{
			background-color: #fff;
			border-radius: 20rpx;
			width: 710rpx;
			margin: 20rpx auto 0 auto;
			padding: 20rpx;
			.good{
				display: flex;
				font-size: 30rpx;
				image{
					height: 100rpx;
					width: 100rpx;
				}
				.title{
					margin-left: 30rpx;
				}
			}
			.textarea{
				width: 100%;
				margin-top: 20rpx;
				font-size: 26rpx;
			}
			.start{
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				font-size: 26rpx;
				.iconfont{
					color: #ccc;
					font-size: 30rpx;
					&+.iconfont{
						margin-left: 10rpx;
					}
				}
				.active{
					color: yellow;
				}
			}
		}
		.submit{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 710rpx;
			height: 90rpx;
			color: #fff;
			background-color: #fb7299;
			margin: 0 auto;
			margin-top: 40rpx;
			border-radius: 45rpx;
		}
	}
</style>
