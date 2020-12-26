<template>
	<view class="address">
		<view class="from">
			<view class="from-item">
				<view class="label">
					收货姓名
				</view>
				<view class="">
					<input type="text"v-model="from.consignee" value="" />
				</view>
			</view>
			<view class="from-item">
				<view class="label">
					联系电话
				</view>
				<view class="">
					<input type="tel" v-model="from.tel" value="" />
				</view>
			</view>
			<picker mode="region" @change="change">
				<view class="from-item">
					<view class="label">
						所在地区
					</view>
					<view class="" v-if="from.provincial">
						{{from.provincial}} {{from.market}} {{from.regional}}
					</view>
					<view class="icon-arrow-r iconfont" v-else>
						请选择
					</view>
				</view>
			</picker>
			<view class="from-textarea">
				<view class="label">
					详细地址
				</view>
				<view class="textarea">
					<textarea value="" v-model="from.address" placeholder=" " />
				</view>
			</view>
		</view>
		<view class="from">
			<view class="from-item space">
				<view class="">
					设为默认地址
				</view>
				<ui-radio :value="check" @change="is_default"></ui-radio>
			</view>
		</view>
		<view class="button" @click="is_click">
			保存
		</view>
	</view>
</template>

<script>
	import  uiRadio from '@/components/radio.vue'
	export default {
		data() {
			return {
				check:false,
				from:{
					consignee:'',
					tel:'',
					provincial:'',
					market:'',
					regional:'',
					address:'',
					default:0,
				},
				id:'',
				edit:false
			};
		},
		onLoad(query){
			if(query.id){
				this.id=Number(query.id);
				this.edit=true;
				this.get_detail();
			}else{
				this.edit =false
			}
		},
		methods:{
			get_detail(){
				this.$http('get|mb/address-detail',{id:this.id}).then(res=>{
					this.from = res.data;
				})
			},
			is_default(val){
				this.check = val;
				this.from.default = val?1:0
			},
			change(value){
				let arr=value.detail.value;
				this.from.provincial = arr[0];
				this.from.market = arr[1];
				this.from.regional = arr[2];
				
			},
			is_click(){
				if(this.edit){
					this.is_edit();
				}else{
					this.save();
				}
			},
			save(){
				this.$http('post|mb/add-address',this.from).then(res=>{
					this.$message(res.msg);
					setTimeout(()=>{
						uni.navigateBack()
					},3000)
				})
			},
			is_edit(){
				this.$http('post|mb/edit-address',this.from).then(res=>{
					this.$message(res.msg);
					setTimeout(()=>{
						uni.navigateBack()
					},3000)
				})
			}
		},
		components:{
			uiRadio
		}
	}
</script>

<style lang="less" scoped>
	.address{
		// padding-top: 10rpx;
		.from{
			padding: 0 30rpx;
			background-color: #fff;
			color: #666;
			margin-top: 20rpx;
			.from-item{
				position: relative;
				height: 100rpx;
				display: flex;
				align-items: center;
				font-size: 30rpx;
				&::after{
					position: absolute;
					content: '';
					width: 100%;
					height: 2rpx;
					background-color: #ccc;
					bottom: 0;
					left: 0;
					transform: translateY(0.5);
				}
				.label{
					width: 230rpx;
				}
				.iconfont{
					text-align: right;
					color: #999;
					flex: 1;
					font-size: 30rpx;
				}
				&.space{
					justify-content: space-between;
				}
			}
			.from-textarea{
				padding: 30rpx 0;
				display: flex;
				align-items: flex-start;
				.label{
					width: 230rpx;
					font-size: 30rpx;
				}
				textarea{
					height: 120rpx;
					width: 500rpx;
				}
			}
		}
		.button{
			width: 710rpx;
			height: 90rpx;
			background: #fb7299;
			border-radius: 22px;
			margin: 0 auto;
			margin-top: 40rpx;
			text-align: center;
			line-height: 90rpx;
			color: #fff;
		}
	}
</style>
