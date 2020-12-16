export default{
	install(Vue){
		Vue.prototype.$save = function(key,data){
			uni.setStorage({
				key,
				data
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
			return new Promise((resolve, reject)=>{
				uni.request({
					url:`${this.$url}${url}`,
					data,
					method,
					timeout:8000,
					header,
					success:(res)=>{
						resolve(res.data)
					},
					fail:(err)=>{
						if(err.status==401){
							
						}
						reject(err)
					}
				})
			})
		}
	}
}