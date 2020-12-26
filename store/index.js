import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);

export const store = new vuex.Store({
	state:{
		user:{},
		shop_car:[
			// {
			// 	url:'http://192.168.5.118:7001/public/6391ace427ade714b70fb966024ae8041607916530575.jpg',
			// 	goods:'手机',
			// 	id:1,
			// 	num:2,
			// 	check:true,
			// 	price:299,
			// }
		],
		address_id:-1,
	},
	getters:{
		getUser(state){
			return state.user
		},
		getShopCar(state){
			return state.shop_car
		},
		getAddress(state){
			return state.address_id
		}
	},
	mutations:{
		setUser(state,value){
			state.user=value
		},
		addCar(state,value){
			state.shop_car.push(value);
		},
		setCar(state,value){
			state.shop_car = value
		},
		setAddress(state,value){
			state.address_id=value;
		}
	},
	actions:{
		setUser({commit},val){
			commit('setUser',val)
		},
		addCar({commit},val){
			commit('addCar',val)
		},
		setCar({commit},val){
			commit('setCar',val)
		},
		setAddress({commit},val){
			commit('setAddress',val)
		}
	}
})