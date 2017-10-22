// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import Api from '@/api'

import 'font-awesome/css/font-awesome.css'
import '@/assets/bulma/css/bulma.css'
import 'buefy/lib/buefy.css'

Vue.use(Buefy, { defaultIconPack: 'fa', defaultContainerElement: '#app' })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  created () {
    this.api = Api(process.env.WEBSOCKET)
  },
  components: { App }
})
