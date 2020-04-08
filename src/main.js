import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import { mdbBtn } from 'mdbvue';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



Vue.config.productionTip = false

Vue.component('mdb-btn', mdbBtn);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
