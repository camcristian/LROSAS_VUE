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
    },
    notificacion:{
      visible:false,
      mensaje:'',
      color:'info'
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
    },
    mostrarInformacion(state,mensaje){
      state.notificacion.mensaje= mensaje
      state.notificacion.color='info'
      state.notificacion.visible=true
    },
    mostrarExito(state,mensaje){
      state.notificacion.mensaje= mensaje
      state.notificacion.color='success'
      state.notificacion.visible=true
    },
    mostrarAdvertencia(state,mensaje){
      state.notificacion.mensaje= mensaje
      state.notificacion.color='warning'
      state.notificacion.visible=true
    },
    mostrarError(state,mensaje){
      state.notificacion.mensaje= mensaje
      state.notificacion.color='error'
      state.notificacion.visible=true
    },
    ocultarNotificacion(state){
      state.notificacion.visible=false
    }

  },
  actions: {
    guardarToken({commit},token){
      commit("setToken", token)
      commit("setUsuario", decode(token))
      let date = new Date(decode(token).exp)
      console.log(decode(token));
     
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
