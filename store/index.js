import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);

export const store = new vuex.Store({
	state:{
		user:{}
	},
	getters:{
		getUser(state){
			return state.user
		}
	},
	mutations:{
		setUser(state,value){
			state.user=value
		}
	},
	actions:{
		setUser({commit},val){
			commit('setUser',val)
		}
	}
})