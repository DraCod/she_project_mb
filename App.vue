<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* #fb7299 */
	@import url("./iconfont/iconfont.css");
	page{
		background-color: #F7F7F7;
	}
	/* padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom); */
	.bold{
		font-weight: bold;
	}
	.ellipsis-two{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	@keyframes toShow{
		from{
			transform: translateY(100%);
		}
		to{
			transform: translateY(0);
		}
	}
	/*每个页面公共css */
</style>
