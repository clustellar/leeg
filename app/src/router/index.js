import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import OrganizationsPage from '@/pages/OrganizationsPage'
import OrganizationPage from '@/pages/OrganizationPage'
import NewOrganizationsPage from '@/pages/NewOrganizationsPage'
import store from '@/store'
import { GlobalTypes } from '@/store/mutation-types'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/orgs',
      name: 'OrganizationsPage',
      component: OrganizationsPage
    },
    {
      path: '/orgs/new',
      name: 'NewOrganizationsPage',
      component: NewOrganizationsPage
    },
    {
      path: '/orgs/:name',
      name: 'OrganizationPage',
      component: OrganizationPage
    },
    {
      path: '/set-token/:token',
      beforeEnter: function (to, from, next) {
        store.dispatch(GlobalTypes.signIn, to.params.token)
        next('/')
      }
    }
  ]
})
