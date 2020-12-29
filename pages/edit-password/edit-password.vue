<template>
	<view class="">
		<view class="from">
			<view class="from-item">
				<view class="">
					输入密码
				</view>
				<input type="password" v-model="password" placeholder="6位数字" />
			</view>
			<view class="from-item">
				<view class="">
					确认密码
				</view>
				<input type="password" v-model="password1"  placeholder="再次输入支付密码" />
			</view>
		</view>
		<view class="submit" @click="submit">
			确认修改
		</view>
		<!-- <password @check_word="" ></password> -->
	</view>
</template>

<script>
	// import password from '../../components/password.vue'
	export default {
		data() {
			return {
				password:'',
				password1:''
			};
		},
		methods:{
			submit(){
				if(isNaN(this.password)){
					this.$message('请输入数字','none')
					return
				}
				if(this.password.length!=6){
					this.$message('请输入6位有效数字','none')
					return
				}
				if(this.password!==this.password1){
					this.$message('两次密码不一样','none')
					return
				}
				this.$http('post|mb/edit-password',{
					password:this.password
				}).then(res=>{
					this.$message(res.msg);
					setTimeout(()=>{
						uni.navigateBack();
					},2000)
				})
			}
		},
		// components:{
		// 	password
		// }
	}
</script>

<style lang="less" scoped>
	.from{
		background-color: #fff;
		padding: 0 30rpx;
		font-size: 26rpx;
		.from-item{
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			input{
				text-align: right;
			}
		}
	}
	.submit{
		width: 710rpx;
		height: 90rpx;
		border-radius: 45rpx;
		background-color: #fb7299;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 28rpx;
		margin: 0 auto;
		margin-top: 20rpx;
	}
</style>
