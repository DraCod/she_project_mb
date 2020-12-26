<template>
	<view>
		<view class="item" v-for="(item,index) in list" :key='index'>
			<commit-item :item="item">
			</commit-item>
		</view>
	</view>
</template>

<script>
	import commitItem from '../../components/comment-item.vue'
	export default {
		data() {
			return {
				id:'',
				list:[]
			};
		},
		onLoad({id}) {
			this.id = id;
			this.get_list();
		},
		methods:{
			get_list(){
				this.$http('get|mb/comment-list',{
					id:this.id
				}).then(res=>{
					this.list = res.data
				})
			}
		},
		components:{
			commitItem,
		}
	}
</script>

<style lang="less" scoped>
	.item+.item{
		margin-top: 20rpx;
	}
</style>
