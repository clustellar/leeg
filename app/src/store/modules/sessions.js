import { SessionTypes } from '../mutation-types'
import api from '@/api'

const state = {
  all: []
}

// getters
const getters = {
  [SessionTypes.all]: state => state.all,
  [SessionTypes.filter]: state => (leegId) => {
    return state.all.filter(session => session.leegId === leegId)
  },
  [SessionTypes.find]: state => (id) => {
    return state.all.find(session => session.id === id)
  }
}

// actions
const actions = {
  [SessionTypes.filter] ({ commit }, params) {
    api.primus.on('session:feed', (feed) => {
      console.log('SESSION CHANGE: ', feed)
    })

    api.session.filter(params).then(resp => commit(SessionTypes.add, resp))
  },
  [SessionTypes.save] ({ commit }, leegName, record) {
    return api.session.save(leegName, record).then(resp => commit(SessionTypes.add, resp))
  },
  [SessionTypes.add] ({ commit }) {
    // services.sessionService.on('created', function (session) {
    //   commit(SessionTypes.add, session)
    // })
  },
  [SessionTypes.remove] ({ commit }) {
    // services.sessionService.on('removed', function (session) {
    //   commit(SessionTypes.remove, session)
    // })
  },
  [SessionTypes.clear] ({ commit }) {
    commit(SessionTypes.clear)
  }
}

// mutations must be synchronous
const mutations = {
  [SessionTypes.add] (state, resp) {
    let keys = state.all.map((session) => session.id) // for uniqueness check

    if (typeof resp.forEach === 'function') {
      resp.forEach(session => {
        let i = keys.indexOf(session.id)
        i === -1 ? state.all.push(session) : state.all.splice(i, 1, session)
      })
    } else if (resp.id) {
      let i = keys.indexOf(resp.id)
      i === -1 ? state.all.push(resp) : state.all.splice(i, 1, resp)
    }
  },
  [SessionTypes.remove] (state, session) {
    let index = state.all.indexOf(session)
    state.all.splice(index, 1)
  },
  [SessionTypes.clear] (state, idx) {
    state.all = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
