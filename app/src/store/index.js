import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import messages from './modules/messages'
import global from './modules/global'
import orgs from './modules/orgs'
import groups from './modules/groups'
import users from './modules/users'
import leegs from './modules/leegs'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    global,
    messages,
    orgs,
    groups,
    users,
    leegs
  },
  strict: debug
})
