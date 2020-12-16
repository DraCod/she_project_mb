import Vue from 'vue'
import App from './App'
import unitl from 'unitls';
import {store} from 'store'

Vue.use(unitl)

Vue.config.productionTip = false

App.mpType = 'app';

Vue.prototype.$url='http://192.168.5.118:7001/'

const app = new Vue({
	store,
    ...App
})
app.$mount()
