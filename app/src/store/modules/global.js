import { GlobalTypes } from '../mutation-types'
import Api from '@/api'

const state = {
  currentUser: null
}

// getters
const getters = {
  [GlobalTypes.currentUser]: state => state.currentUser
}

// actions
const actions = {
  [GlobalTypes.getCurrentUser] ({ commit }) {
    Api.user.me().then(function (user) {
      console.log('ME: ', user)
      if (user) {
        commit(GlobalTypes.setCurrentUser, user)
      }
    })
  },
  [GlobalTypes.setCurrentUser] ({ commit }, user) {
    commit(GlobalTypes.setCurrentUser, user)
  }
}

// mutations must be synchronous
const mutations = {
  [GlobalTypes.setCurrentUser] (state, user) {
    state.currentUser = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
