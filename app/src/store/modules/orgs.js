import { OrgTypes } from '../mutation-types'
import api from '@/api'
import store from '@/store'

const state = {
  all: []
}

// getters
const getters = {
  [OrgTypes.all]: state => state.all,
  [OrgTypes.filter]: state => (name) => {
    return state.all.find(org => org.name === name)
  }
}

// actions
const actions = {
  [OrgTypes.filter] ({ commit }, opts) {
    api.primus.on('namespace:feed', (feed) => {
      console.log('ORG CHANGE: ', feed)
      console.log(store)
    })

    api.namespace.filter(opts).then(resp => commit(OrgTypes.add, resp))
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
  [OrgTypes.add] (state, resp) {
    let keys = state.all.map((org) => org.name) // for uniqueness check

    if (typeof resp.forEach === 'function') {
      resp.forEach((org) => {
        if (keys.indexOf(org.name) === -1) {
          state.all.push(org)
        }
      })
    } else if (resp.name) {
      if (keys.indexOf(resp.name) === -1) {
        state.all.push(resp)
      }
    }
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
