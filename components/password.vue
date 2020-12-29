<template>
	<view v-if="dialog" class="background-box">
		<view class="content">
			<view class="title font-32 bold">
				输入支付密码
				<view class="iconfont icon-guanbi1" @tap="close"></view>
			</view>
			<view class="number-box">
				<view class="number font-52 bold">
					￥{{pay_price}}
				</view>
				<view class="show-number">
					<view :class="[passworld[0]!==undefined?'ball':'']"></view>
					<view :class="[passworld[1]!==undefined?'ball':'']"></view>
					<view :class="[passworld[2]!==undefined?'ball':'']"></view>
					<view :class="[passworld[3]!==undefined?'ball':'']"></view>
					<view :class="[passworld[4]!==undefined?'ball':'']"></view>
					<view :class="[passworld[5]!==undefined?'ball':'']"></view>
				</view>
				<view class="no-passworld font-24" @tap="to_reset_password">
					忘记密码？
				</view>
			</view>
			<view class="keybord">
				<view>
					<view @tap="change_bord(1)">
						<view class="font-56">1</view>
						<view class="font-22"></view>
					</view>
					<view class="keybord-center" @tap="change_bord(2)">
						<view class="font-56">2</view>
						<view class="font-22">ABC</view>
					</view>
					<view @tap="change_bord(3)">
						<view class="font-56" >3</view>
						<view class="font-22">DEF</view>
					</view>
				</view>
				<view>
					<view @tap="change_bord(4)">
						<view class="font-56" >4</view>
						<view class="font-22">GHI</view>
					</view>
					<view class="keybord-center" @tap="change_bord(5)">
						<view class="font-56" >5</view>
						<view class="font-22">JKL</view>
					</view>
					<view @tap="change_bord(6)">
						<view class="font-56" >6</view>
						<view class="font-22">MNO</view>
					</view>
				</view>
				<view>
					<view  @tap="change_bord(7)">
						<view class="font-56">7</view>
						<view class="font-22">PQRS</view>
					</view>
					<view class="keybord-center" @tap="change_bord(8)">
						<view class="font-56">8</view>
						<view class="font-22">TUV</view>
					</view>
					<view  @tap="change_bord(9)">
						<view class="font-56">9</view>
						<view class="font-22">WXYZ</view>
					</view>
				</view>
				<view>
					<view style="background-color: #9499A0;">
					</view>
					<view class="keybord-center" @tap="change_bord(0)">
						<view class="font-56" style="line-height:110rpx">0</view>
					</view>
					<view style="background-color: #9499A0;" class="delete" @tap="delete_number">
						<image :src="icon" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import icon from '../assets/icon_2.png';
	export default{
		props:{
			value:{},
			pay_price:{},
			show:{
				default:true
			},
			change:{}
		},
		data(){
			return{
				dialog:false,
				passworld:[],
				icon
			}
		},
		methods:{
			to_reset_password(){
				uni.navigateTo({
					url:'/pages/edit-password/edit-password'
				})
			},
			change_bord(num){
				this.passworld.push(num);
				if(this.passworld.length===6){
					this.$emit('check_word',this.passworld.join(''))
				}
			},
			delete_number(){
				this.passworld.splice(this.passworld.length-1,1)
			},
			close(){
				this.dialog=false;
				this.$emit('close');
			}
		},
		watch:{
			value(val){
				this.dialog=val
			},
			dialog(val){
				this.$emit('input',val);
			},
			change(){
				this.passworld=[]
			}
		},
	}
</script>

<style>
.background-box{
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0,0,0,0.7);
	z-index: 999;
}
.content{
	background-color: #FFFFFF;
	position: absolute;
	bottom: 0;
	width: 100%;
	animation: toShow 0.2s;
}
.title{
	line-height: 90upx;
	text-align: center;
	position: relative;
}
.title .iconfont{
	position: absolute;
	right: 30upx;
	top: 50%;
	transform: translateY(-50%);
	font-size: 40rpx;
}
.number-box{
	padding-top: 30rpx;
	padding-bottom: 30rpx;
	background-color: #F5F7FA;
}
.number{
	line-height: 100upx;
	text-align: center;
	color: #F4293F;
}
.show-number{
	width: 600upx;
	height: 100upx;
	display: flex;
	margin: 40upx auto 20upx auto;
	background-color: #FFFFFF;
	border: 1upx solid #ECECEC;
	border-right: none;
}
.show-number>view{
	flex: 1;
	box-sizing: border-box;
	border-right:1upx solid #ECECEC;
}
.ball{
	position: relative;
}
.ball::after{
	position: absolute;
	content: '';
	height: 50upx;
	width: 50upx;
	background-color: #333333;
	border-radius: 50%;
	top: 50%;
	margin-top: -25upx;
	left: 50%;
	margin-left: -25upx;
}
.no-passworld{
	width: 600upx;
	margin: 0 auto 60upx auto;
	text-align: right;
}
.keybord>view{
	display: flex;
	justify-content: space-between;
	background-color: #FFFFFF;
	border-bottom: 1upx solid #9499A0;
	box-sizing: border-box;
}
.keybord-center{
	border-left: 1upx solid #9499A0;
	border-right: 1upx solid #9499A0;
}
.keybord>view>view{
	flex: 1;
	text-align: center;
	height: 110upx;
	box-sizing: border-box;
}
.delete{
	position: relative;
}
.delete image{
	height: 34upx;
	width: 48upx;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -17upx;
	margin-left: -24upx;
}
</style>
