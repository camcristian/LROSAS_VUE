import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null,
    carga:false,
    loading :{
      titulo:'',
      estado:false,
      color:'primary'
    }
  },
  mutations: {
mostrarLoading(state,payload){
state.loading.titulo =payload.titulo,
state.loading.color =payload.color,
state.loading.estado =true

},
ocultarLoading(state){
  state.loading.estado =false
  },

    setToken(state,token){
      state.token=token
    },
    setUsuario (state,usuario){
      state.usuario=usuario
    },
    cargarLoad(state,payload){
      state.carga=payload
    }
  },
  actions: {
    guardarToken({commit},token){
      commit("setToken", token)
      commit("setUsuario", decode(token))
      localStorage.setItem("token", token)
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token")
      if (token){
        commit("setToken", token)
        commit("setUsuario", decode(token))
      }
      router.push({name: 'home'})
    },
    salir({commit}){
      commit("setToken", null)
      commit("setUsuario", null)
      localStorage.removeItem("token")
      router.push({name: 'login'})
    }
  }


  
})
