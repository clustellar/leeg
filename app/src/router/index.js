import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import OrganizationListPage from '@/pages/orgs/List'
import OrganizationEditPage from '@/pages/orgs/Edit'
import OrganizationShowPage from '@/pages/orgs/Show'
import OrganizationNewPage from '@/pages/orgs/New'
import GroupListPage from '@/pages/groups/List'
import GroupEditPage from '@/pages/groups/Edit'
import GroupShowPage from '@/pages/groups/Show'
import GroupNewPage from '@/pages/groups/New'
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
      name: 'OrganizationListPage',
      component: OrganizationListPage
    },
    {
      path: '/orgs/new',
      name: 'OrganizationNewPage',
      component: OrganizationNewPage
    },
    {
      path: '/orgs/:name/edit',
      name: 'OrganizationEditPage',
      component: OrganizationEditPage
    },
    {
      path: '/orgs/:name',
      name: 'OrganizationShowPage',
      component: OrganizationShowPage
    },
    {
      path: '/groups',
      name: 'GroupListPage',
      component: GroupListPage
    },
    {
      path: '/groups/new',
      name: 'GroupNewPage',
      component: GroupNewPage
    },
    {
      path: '/groups/:name/edit',
      name: 'GroupEditPage',
      component: GroupEditPage
    },
    {
      path: '/groups/:name',
      name: 'GroupShowPage',
      component: GroupShowPage
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
