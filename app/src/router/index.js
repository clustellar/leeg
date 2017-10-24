import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/token/:token',
      beforeEnter: function (to, from, next) {
        window.sessionStorage.setItem('token', to.params.token) // set session token
        next('/')
      }
    }
  ]
})
