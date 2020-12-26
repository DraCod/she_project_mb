<template>
	<view class="radio" @click="change">
		<view :class="[active?'active':'','active-box']">
			<view :class="[active?'item-active':'','iconfont icon-gouxuan']">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			value:{}
		},
		data() {
			return {
				active:false
			};
		},
		mounted(){
			this.active = this.value;
		},
		methods:{
			change(){
				this.$emit('change',!this.active)
			}
		},
		watch:{
			value(val){
				this.active = val
			},
			active(val){
				this.$emit('input',val)
			}
		}
	}
</script>

<style scoped lang="less">
	.active-box{
		height: 36rpx;
		width: 36rpx;
		transition: all .3s;
		border: 2rpx solid #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		&.active{
			background-color: #fb7299;
			border-color: #fb7299;
		}
		.icon-gouxuan{
			transform: scale(0);
			transition: all .3s;
			color: #fff;
			font-size: 24rpx;
		}
		.item-active{
			transform: scale(1);
		}
	}
	
</style>
