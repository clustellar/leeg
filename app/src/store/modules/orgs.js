import { OrgTypes } from '../mutation-types'
import api from '@/api'

const state = {
  all: []
}

// getters
const getters = {
  [OrgTypes.all]: state => state.all
}

// actions
const actions = {
  [OrgTypes.fetch] ({ commit }, opts) {
    api.namespace.findAll(opts).then(resp => {
      commit(OrgTypes.fetch, resp)
    })
  },
  [OrgTypes.add] ({ commit }) {
    // services.orgService.on('created', function (org) {
    //   commit(OrgTypes.add, org)
    // })
  },
  [OrgTypes.remove] ({ commit }) {
    // services.orgService.on('removed', function (org) {
    //   commit(OrgTypes.remove, org)
    // })
  },
  [OrgTypes.clear] ({ commit }) {
    commit(OrgTypes.clear)
  }
}

// mutations must be synchronous
const mutations = {
  [OrgTypes.fetch] (state, orgs) {
    orgs.forEach(function (org) {
      if (state.all[org] === -1) {
        state.all.push(org)
      }
    })
  },
  [OrgTypes.add] (state, org) {
    state.all.push(org)
  },
  [OrgTypes.remove] (state, org) {
    let index = state.all.indexOf(org)
    state.all.splice(index, 1)
  },
  [OrgTypes.clear] (state, idx) {
    state.all = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
