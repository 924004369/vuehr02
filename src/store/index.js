import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //这里放全局参数
        routes:[]

    },
    mutations:{
        //这里放set方法
        initRoutes(state,data){
            state.routes=data;
        }
    },
    getters:{
        //这里是get方法
    },
    actions:{

    }
})