import { MessageTypes } from '../mutation-types'

const state = {
  all: []
}

// getters
const getters = {
  [MessageTypes.all]: state => state.all
}

// actions
const actions = {
  [MessageTypes.fetch] ({ commit }, opts) {
    // services.messageService.find(opts || {}).then(resp => {
    //   commit(MessageTypes.fetch, resp.data)
    // })
  },
  [MessageTypes.add] ({ commit }) {
    // services.messageService.on('created', function (message) {
    //   commit(MessageTypes.add, message)
    // })
  },
  [MessageTypes.remove] ({ commit }) {
    // services.messageService.on('removed', function (message) {
    //   commit(MessageTypes.remove, message)
    // })
  },
  [MessageTypes.clear] ({ commit }) {
    commit(MessageTypes.clear)
  }
}

// mutations must be synchronous
const mutations = {
  [MessageTypes.add] (state, message) {
    state.all.push(message)
  },
  [MessageTypes.remove] (state, message) {
    let index = state.all.indexOf(message)
    state.all.splice(index, 1)
  },
  [MessageTypes.clear] (state, idx) {
    state.all = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
