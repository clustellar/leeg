import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import OrganizationListPage from '@/components/orgs/List'
import OrganizationEditPage from '@/components/orgs/Edit'
import OrganizationShowPage from '@/components/orgs/Show'
import OrganizationNewPage from '@/components/orgs/New'
import GroupListPage from '@/components/groups/List'
import GroupEditPage from '@/components/groups/Edit'
import GroupShowPage from '@/components/groups/Show'
import GroupNewPage from '@/components/groups/New'
import LeegNewPage from '@/components/leegs/New'
import LeegEditPage from '@/components/leegs/Edit'
import LeegShowPage from '@/components/leegs/Show'
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
      path: '/leagues/new',
      name: 'LeegNewPage',
      component: LeegNewPage
    },
    {
      path: '/leagues/:name/edit',
      name: 'LeegEditPage',
      component: LeegEditPage
    },
    {
      path: '/leagues/:name',
      name: 'LeegShowPage',
      component: LeegShowPage
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
