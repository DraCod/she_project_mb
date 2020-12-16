<template>
	<view>
		<button open-type="getUserInfo" class="ok" @getuserinfo="bindGetUserInfo">同意</button>
		<picker mode="region" @change="change">
			<view>{{test}}</view>
		</picker>
		{{
			JSON.stringify(getUser)
		}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				test:'123'
			};
		},
		methods: {
			change(value){
				
			},
			bindGetUserInfo() {
				uni.login({
					success: res => {
						if (res.code) {
							let code = res.code;
							uni.getUserInfo({
								success: res => {
									this.$http('post|mb/login',{
										code,
										encryptedData: res.encryptedData,
										iv: res.iv
									}).then(res=>{
										this.$save('token',res.token);
										this.$store.dispatch('setUser',res.data);
									})
								},
								fail: err => {
									uni.showToast({
										title: '授权失败',
										icon: 'none'
									});
								}
							});
						}
					}
				});

			}
		},
		computed:{
			getUser(){
				return this.$store.getters.getUser
			}
		}
	};
</script>

<style lang="less"></style>
