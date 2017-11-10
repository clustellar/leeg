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
  [GlobalTypes.signIn] ({ commit }, token) {
    if (token) {
      window.sessionStorage.setItem(GlobalTypes.sessionToken, token)
    } else {
      token = window.sessionStorage.getItem(GlobalTypes.sessionToken)
    }
    if (token) {
      Api.user.me(token).then(function (user) {
        console.log('ME: ', user)
        if (user) {
          commit(GlobalTypes.currentUser, user)
        }
      })
    }
  },
  [GlobalTypes.signOut] ({ commit }) {
    window.sessionStorage.removeItem(GlobalTypes.sessionToken)
    commit(GlobalTypes.currentUser, null)
  }
}

// mutations must be synchronous
const mutations = {
  [GlobalTypes.currentUser] (state, user) {
    state.currentUser = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
