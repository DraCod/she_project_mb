import Vue from 'vue'
import App from './App'
import unitl from 'unitls';
import {store} from 'store'

Vue.use(unitl)

Vue.config.productionTip = false

App.mpType = 'app';

Vue.prototype.$url='http://127.0.0.1:7001/'
// Vue.prototype.$url='http://192.168.43.245:7001/'
// Vue.prototype.$url='http://172.20.10.13:7001/'
Vue.prototype.$store=store


const app = new Vue({
	store,
    ...App
})
app.$mount()
