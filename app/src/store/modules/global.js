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
  [GlobalTypes.signIn] ({ commit }, provider) {
    Api.auth.signIn(provider).then(function (user) {
      console.log('Signed In!', user)
      commit(GlobalTypes.setCurrentUser, user)
    })
    .catch(function (err) {
      console.error('Unable to sign in.', err)
    })
  },
  [GlobalTypes.getCurrentUser] ({ commit }, token) {
    Api.user.whoami(token).then(function (user) {
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
