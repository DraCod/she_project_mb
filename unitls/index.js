export default{
	install(Vue){
		Vue.prototype.$save =async  function(key,data){
			await uni.setStorage({
				key,
				data
			})
		}
		Vue.prototype.$message = function(title,icon='success'){
			uni.showToast({
				title,
				duration:3000,
				icon
			})
		}
		Vue.prototype.$get = function(key){
			return uni.getStorageSync(key)
		}
		Vue.prototype.$http = function(_url,data={}){
			let [method,url] = _url.split('|');
			method = method.toUpperCase();
			let header = {
				authorization:this.$get('token'),
			}
			uni.showLoading({
				title:'正在加载'
			})
			return new Promise((resolve, reject)=>{
				uni.request({
					url:`${this.$url}${url}`,
					data,
					method,
					timeout:8000,
					header,
					success:(res)=>{
						if(res.data.status==402){
							uni.hideLoading()
							reject(res.data)
						}else if(res.data.status==401){
							uni.showModal({
								title: '提示',
								content: '请先登录',
								success: function (res) {
									if (res.confirm) {
										uni.switchTab({
											url:`/pages/my/my`
										})
									} else if (res.cancel) {
										uni.navigateBack()
									}
								}
							})
						}else{
							uni.hideLoading()
							resolve(res.data)
						}
					},
					fail:(err)=>{
						if(err.status==401){
							uni.showModal({
								title: '提示',
								content: '请先登录',
								success: function (res) {
									if (res.confirm) {
										uni.switchTab({
											url:`/pages/my/my`
										})
									} else if (res.cancel) {
										uni.navigateBack()
									}
								}
							})
						}
						reject(err);
					},
					complete:()=>{
						
					}
				})
			})
		}
	}
}