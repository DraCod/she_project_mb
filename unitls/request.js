import vue from 'vue';

vue.prototype.$http = function(){
	return Promise((res,rev)=>{
		uni.request({
			url:`${this.$url}`
		})
	})
	
}