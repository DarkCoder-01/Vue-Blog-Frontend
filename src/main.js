import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import mavonEditor from 'mavon-editor'
import setAxios from './network/index.js'
import axios from 'axios'
import store from './store/index.js'

import 'element-ui/lib/theme-chalk/index.css'
import 'mavon-editor/dist/css/index.css'


import '@/assets/scss/reset.scss'
import '@/assets/font/iconfont.css'
import '@/assets/scss/mobile.scss'



setAxios()
Vue.use(mavonEditor)
Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
