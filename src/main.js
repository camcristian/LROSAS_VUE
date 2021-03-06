import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import "chart.js";
import "hchs-vue-charts";
Vue.use(window.VueCharts);
Vue.use(Vuelidate)

Vue.config.productionTip = false
axios.defaults.baseURL='http://192.168.0.174:8080/'

//axios.defaults.baseURL='https://localhost:44388/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

