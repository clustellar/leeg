import { MembershipTypes } from '../mutation-types'
import api from '@/api'

const state = {
  all: []
}

// getters
const getters = {
  [MembershipTypes.all]: state => state.all,
  [MembershipTypes.filter]: state => (leegId, sessionId) => {
    return state.all.filter(membership => membership.sessionId === sessionId)
  },
  [MembershipTypes.find]: state => (id) => {
    return state.all.find(membership => membership.id === id)
  }
}

// actions
const actions = {
  [MembershipTypes.filter] ({ commit }, leegId, sessionId, opts) {
    api.primus.on('membership:feed', (feed) => {
      console.log('Membership CHANGE: ', feed)
    })

    api.membership.filter(leegId, sessionId, opts).then(resp => commit(MembershipTypes.add, resp))
  },
  [MembershipTypes.save] ({ commit }, leegId, sessionId, gameId, record) {
    return api.membership.save(leegId, sessionId, gameId, record).then(resp => commit(MembershipTypes.add, resp))
  },
  [MembershipTypes.add] ({ commit }) {
    // services.membershipService.on('created', function (membership) {
    //   commit(MembershipTypes.add, membership)
    // })
  },
  [MembershipTypes.remove] ({ commit }) {
    // services.membershipService.on('removed', function (membership) {
    //   commit(MembershipTypes.remove, membership)
    // })
  },
  [MembershipTypes.clear] ({ commit }) {
    commit(MembershipTypes.clear)
  }
}

// mutations must be synchronous
const mutations = {
  [MembershipTypes.add] (state, resp) {
    let keys = state.all.map((membership) => membership.id) // for uniqueness check

    if (typeof resp.forEach === 'function') {
      resp.forEach(membership => {
        let i = keys.indexOf(membership.id)
        i === -1 ? state.all.push(membership) : state.all.splice(i, 1, membership)
      })
    } else if (resp.id) {
      let i = keys.indexOf(resp.id)
      i === -1 ? state.all.push(resp) : state.all.splice(i, 1, resp)
    }
  },
  [MembershipTypes.remove] (state, membership) {
    let index = state.all.indexOf(membership)
    state.all.splice(index, 1)
  },
  [MembershipTypes.clear] (state, idx) {
    state.all = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
