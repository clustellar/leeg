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
import SessionNewPage from '@/components/sessions/New'
import SessionShowPage from '@/components/sessions/Show'
import store from '@/store'
import { GlobalTypes, LeegTypes, SessionTypes, GameTypes, GroupTypes, OrgTypes } from '@/store/mutation-types'

Vue.use(Router)

let router = new Router({
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
      path: '/leagues/:leegId/edit',
      name: 'LeegEditPage',
      component: LeegEditPage
    },
    {
      path: '/leagues/:leegId',
      name: 'LeegShowPage',
      component: LeegShowPage
    },
    {
      path: '/leagues/:leegId/sessions/new',
      name: 'SessionNewPage',
      component: SessionNewPage
    },
    {
      path: '/leagues/:leegId/sessions/:sessionId',
      name: 'SessionShowPage',
      component: SessionShowPage
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
      path: '/orgs/:orgId/edit',
      name: 'OrganizationEditPage',
      component: OrganizationEditPage
    },
    {
      path: '/orgs/:orgId',
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
      path: '/groups/:groupId/edit',
      name: 'GroupEditPage',
      component: GroupEditPage
    },
    {
      path: '/groups/:groupId',
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

router.beforeEach((to, from, next) => {
  store.cache.dispatch(LeegTypes.filter, {})
  store.cache.dispatch(LeegTypes.logo, {})

  if (to.params.leegId) {
    store.cache.dispatch(LeegTypes.filter, { id: to.params.leegId })
  }
  if (to.params.sessionId) {
    store.cache.dispatch(SessionTypes.filter, { id: to.params.sessionId })
  }
  if (to.params.gameId) {
    store.cache.dispatch(GameTypes.filter, { id: to.params.gameId })
  }
  if (to.params.orgId) {
    store.cache.dispatch(OrgTypes.filter, { id: to.params.orgId })
  }
  if (to.params.groupId) {
    store.cache.dispatch(GroupTypes.filter, { id: to.params.groupId })
  }

  switch (to.name) {
    case 'LeegShowPage':
    case 'LeegEditPage':
      store.cache.dispatch(LeegTypes.filter, { id: to.params.leegId })
      store.cache.dispatch(LeegTypes.logo, { id: to.params.leegId })
      store.cache.dispatch(SessionTypes.filter, { leegId: to.params.leegId })
      break
    case 'SessionShowPage':
    case 'SessionEditPage':
      store.cache.dispatch(SessionTypes.filter, { id: to.params.sessionId })
      break
  }
  next()
})

export default router
