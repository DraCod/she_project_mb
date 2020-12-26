<template>
	<view class="address-list">
		<view 
			class="address-item" 
			v-for="(item,index) in address_list" 
			:key="index"
			@click="change_address(item)">
			<view class="flex user-info">
				<view class="">
					{{item.consignee}}
				</view>
				<view class="phone">
					{{item.tel}}
				</view>
			</view>
			<view class="address">
				{{item.allAddress}}
			</view>
			<view class="option">
				<view class="option-radiio">
					<ui-radio :value="item.default==1"></ui-radio>
					<view :class="[item.default==1?'color':'','text']">
						默认地址
					</view>
				</view>
				<view class="option-bottom">
					<view @click.stop="edit(item)">
						编辑
					</view>
					<view @click.stop="remove(item)">
						删除
					</view>
				</view>
			</view>
		</view>
		<view class="fixed" @click="to_add">
			新增地址
		</view>
	</view>
</template>

<script>
	import  uiRadio from '@/components/radio.vue'
	export default {
		data() {
			return {
				check:false,
				address_list:[],
				change:false
			};
		},
		onLoad({type}){
			if(type){
				this.change=true;
			}
		},
		onShow(){
			this.get_list();
		},
		methods:{
			edit(item){
				uni.navigateTo({
					url:`/pages/add-address/add-address?id=${item.id}`
				})
			},
			remove(item){
				uni.showModal({
				    title:'提示',
				    content:'确认删除？',
				    success:(res)=> {
				        if (res.confirm) {
							console.log(item.id)
				            this.$http('post|mb/remove-address',{
								id:item.id
							}).then(res=>{
								this.$message('删除成功')
								setTimeout(()=>{
									this.get_list()
								},3000)
							})
				        } else if (res.cancel) {
				            this.$message('已取消删除')
				        }
				    }
				});
			},
			get_list(){
				this.$http('get|mb/address-list').then(res=>{
					this.address_list = res.data;
				})
			},
			to_add(){
				uni.navigateTo({
					url:'/pages/add-address/add-address'
				})
			},
			change_address(item){
				this.$store.dispatch('setAddress',item.id);
				uni.navigateBack()
			}
		},
		components:{
			uiRadio
		}
	}
</script>

<style lang="less" scoped>
	.address-list{
		padding-bottom: calc(constant(safe-area-inset-bottom) + 100rpx);
		padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);
		padding-top: 10rpx;
		box-sizing: border-box;
		.flex{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.address-item{
			background-color: #fff;
			padding: 20rpx 30rpx;
			&+.address-item{
				margin-top: 10rpx;
			}
			.user-info{
				font-size: 32rpx;
			}
			.address{
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				margin-top: 20rpx;
				color: #999;
				font-size: 28rpx;
			}
			.option{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				.option-radiio{
					display: flex;
					font-size: 28rpx;
					.text{
						margin-left: 20rpx;
					}
					.color{
						color: #fb7299;
						transition: all .3s;
					}
				}
				.option-bottom{
					display: flex;
					font-size: 28rpx;
					color: #999;
					>view+view{
						margin-left: 20rpx;
					}
				}
			}
		}
		.fixed{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			background-color: #fb7299;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			font-size: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
		}
	}
</style>
