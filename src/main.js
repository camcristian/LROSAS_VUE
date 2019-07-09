import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false
axios.defaults.baseURL='http://www.lautaroweb.cl:8070/'

//axios.defaults.baseURL='https://localhost:44388/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
